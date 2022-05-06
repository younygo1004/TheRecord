pipeline {
	agent none
	options { skipDefaultCheckout(false) }
	stages {
		stage('git pull') {
			agent any
			steps {
				mattermostSend (
					color: "#2A42EE", 
					message: "Build STARTED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
				)  
				checkout scm
			}
		}

		stage('Docker build') {
			agent any
			steps {
				script {
					try {
						sh 'docker build -t backend:latest /var/jenkins_home/workspace/record/back-end/the_record \
												--build-arg profile=${profile} \
												--build-arg MYSQL_DATABASE_URL=${MYSQL_DATABASE_URL} \
												--build-arg MYSQL_DATABASE_USERNAME=${MYSQL_DATABASE_USERNAME} \
												--build-arg MYSQL_DATABASE_PASSWORD=${MYSQL_DATABASE_PASSWORD} \
                                                --build-arg OPENVIDU_SECRET=${OPENVIDU_SECRET} \
                                                --build-arg OPENVIDU_URL=${OPENVIDU_URL}'
										
						sh 'cp -r /home/deploy/data/certbot /var/jenkins_home/workspace/record/front-end/the-record/'
                        sh 'sudo cp ~/deploy/data/certbot/conf/live/k6b204.p.ssafy.io/k6b204.p.ssafy.io.p12 /var/jenkins_home/workspace/record/front-end/the-record/src/main/resources/'

						sh 'docker build -t frontend:latest /var/jenkins_home/workspace/record/front-end/the-record'
					} catch (e) {
						mattermostSend (
							color: "danger", 
							message: "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
						)
					}
				}
			}
		}
        
		stage('Docker run') {
			agent any
			steps {
				script {
					try {
						sh 'docker ps -f name=backend -q \
								| xargs --no-run-if-empty docker container stop'
										sh 'docker ps -f name=frontend -q | xargs --no-run-if-empty docker container stop'

						sh 'docker container ls -a -f name=backend -q \
								| xargs -r docker container rm'
										sh 'docker container ls -a -f name=frontend -q | xargs -r docker container rm'

						sh 'docker images -f dangling=true && docker rmi $(docker images -f dangling=true -q)' 	
										
										sh 'docker run -itd -v /home/ubuntu/deploy/data/record:/home/ubuntu/deploy/data/record \
												-p 8080:8080 --name backend backend \
												--profile=${profile} \
												--MYSQL_DATABASE_URL=${MYSQL_DATABASE_URL} \
												--MYSQL_DATABASE_USERNAME=${MYSQL_DATABASE_USERNAME} \
												--MYSQL_DATABASE_PASSWORD=${MYSQL_DATABASE_PASSWORD} \
                                                --OPENVIDU_SECRET=${OPENVIDU_SECRET} \
                                                --OPENVIDU_URL=${OPENVIDU_URL}'

										sh 'docker run -d --name frontend \
								-p 80:80 \
								-p 443:443 \
								-v /etc/localtime:/etc/localtime:ro \
								--network recordnetwork \
								frontend:latest'
					} catch(e) {
						currentBuild.result = "FAILURE"
					} finally {
						if(currentBuild.result == "FAILURE") {
							mattermostSend (
								color: "danger", 
								message: "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
							)
						}
						else {
							mattermostSend (
								color: "good", 
								message: "Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
							)
						}
					}
				}
      }
		}
		
	}
}
