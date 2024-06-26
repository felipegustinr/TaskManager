-- Table: public.rol
-- DROP TABLE IF EXISTS public.rol;
CREATE TABLE IF NOT EXISTS public.rol (
    id bigserial NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT rol_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.rol OWNER to admin;