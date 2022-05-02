pipeline {
	agent none
	options { skipDefaultCheckout(false) }
	stages {
		stage('git pull') {
			agent any
			steps {
				checkout scm
			}
		}

		stage('Docker build') {
			agent any
			steps {
				sh 'docker build -t backend:latest /var/jenkins_home/workspace/record/back-end/the_record \
                    --build-arg profile=${profile} \
                    --build-arg MYSQL_DATABASE_URL=${MYSQL_DATABASE_URL} \
                    --build-arg MYSQL_DATABASE_USERNAME=${MYSQL_DATABASE_USERNAME} \
                    --build-arg MYSQL_DATABASE_PASSWORD=${MYSQL_DATABASE_PASSWORD}'
                
                sh 'cp -r /home/deploy/data/certbot /var/jenkins_home/workspace/record/front-end/the-record/'

                sh 'docker build -t frontend:latest /var/jenkins_home/workspace/record/front-end/the-record'

                sh 'docker build -t testimage:latest /var/jenkins_home/workspace/record/testCode'
			}
		}
        
		stage('Docker run') {
			agent any
			steps {
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
                    --MYSQL_DATABASE_PASSWORD=${MYSQL_DATABASE_PASSWORD}'

                sh 'docker run -d --name frontend \
						-p 80:80 \
						-p 443:443 \
						-v /etc/localtime:/etc/localtime:ro \
						--network recordnetwork \
						frontend:latest'

                sh 'docker run -d --name testimage' 
            }
		}
		
	}
}
