-- Table: public.user
-- DROP TABLE IF EXISTS public."user";
CREATE TABLE IF NOT EXISTS public."user" (
    id bigserial NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    rol_id bigint NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT user_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.rol (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."user" OWNER to admin;