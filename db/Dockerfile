FROM postgres:latest

ENV POSTGRES_DB=mydb
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=yourpassword

EXPOSE 5432

# Optional: Add initialization scripts
# COPY ./init.sql /docker-entrypoint-initdb.d/

VOLUME ["/var/lib/postgresql/data"]