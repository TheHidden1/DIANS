# Use the official PostgreSQL image as a parent image
FROM postgres:latest

ENV POSTGRES_USER user
ENV POSTGRES_PASSWORD dians2023
ENV POSTGRES_DB postgres

COPY init_table.sql /docker-entrypoint-initdb.d/01-init_table.sql
COPY init_data.sql /docker-entrypoint-initdb.d/02-init_data.sql

EXPOSE 5432