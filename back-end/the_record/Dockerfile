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
ENTRYPOINT java -jar profile=$profile MYSQL_DATABASE_URL=${MYSQL_DATABASE_URL} MYSQL_DATABASE_USERNAME=${MYSQL_DATABASE_USERNAME} MYSQL_DATABASE_PASSWORD=${MYSQL_DATABASE_PASSWORD} ./the_record-0.0.1-SNAPSHOT.jar
# "-Dprofile=echo $profile", "-DMYSQL_DATABASE_URL=echo $MYSQL_DATABASE_URL", "-DMYSQL_DATABASE_USERNAME=echo $MYSQL_DATABASE_USERNAME", "-DMYSQL_DATABASE_PASSWORD=echo $MYSQL_DATABASE_PASSWORD"