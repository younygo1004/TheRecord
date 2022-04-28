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
ENTRYPOINT ["java", "-jar", "./the_record-0.0.1-SNAPSHOT.jar"]
