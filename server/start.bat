@echo off

SET string=%~dp0..\files\
SET modified=%string:\=/%

@echo # Server config> ./src/main/resources/config/config.properties
@echo serv_port=8090>> ./src/main/resources/config/config.properties
@echo serv_origin=*>> ./src/main/resources/config/config.properties
@echo serv_login=true>> ./src/main/resources/config/config.properties
@echo # Files server config>> ./src/main/resources/config/config.properties
@echo files_root=%modified%>> ./src/main/resources/config/config.properties
@echo # Mongo config>> ./src/main/resources/config/config.properties
@echo db_host=127.0.0.1>> ./src/main/resources/config/config.properties
@echo db_port=4242>> ./src/main/resources/config/config.properties
@echo db_name=db-dev>> ./src/main/resources/config/config.properties
@echo db_user=>> ./src/main/resources/config/config.properties
@echo db_pass=>> ./src/main/resources/config/config.properties
@echo db_path=>> ./src/main/resources/config/config.properties

call mvn clean
call mvn install -DskipTests=true
call mvn exec:java
call mvn tomcat7:run