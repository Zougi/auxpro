call mvn clean
call mvn install -DskipTests=true
call mvn exec:java
call mvn tomcat7:run
