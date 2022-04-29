FROM openjdk:8 AS builder
WORKDIR /the_record
COPY . .
RUN chmod +x ./gradlew

RUN rm -rf src/test
RUN ./gradlew clean build
RUN ls build/libs

FROM adoptopenjdk:8-jdk
COPY --from=builder /the_record/build/libs/*.jar ./

EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "./the_record-0.0.1-SNAPSHOT.jar"]
# ENTRYPOINT ["java", "-jar", "./the_record-0.0.1-SNAPSHOT.jar", "-Dspring-boot.run.arguments=--profile=${SPRING_PROFILE}, --MYSQL_DATABASE_URL=${MYSQL_DATABASE_URL}, --MYSQL_DATABASE_USERNAME=${MYSQL_DATABASE_USERNAME}, --MYSQL_DATABASE_PASSWORD=${MYSQL_DATABASE_PASSWORD}"]
ENTRYPOINT ["java", "-jar", "./the_record-0.0.1-SNAPSHOT.jar", "--SPRING_PROFILE=$SPRING_PROFILE", "--MYSQL_DATABASE_URL=$MYSQL_DATABASE_URL", "--MYSQL_DATABASE_USERNAME=$MYSQL_DATABASE_USERNAME", "--MYSQL_DATABASE_PASSWORD=$MYSQL_DATABASE_PASSWORD"]