-- Table: public.task
-- DROP TABLE IF EXISTS public.task;
CREATE TABLE IF NOT EXISTS public.task (
    id bigserial NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    completed boolean NOT NULL,
    create_at date DEFAULT CURRENT_DATE,
    list_id bigint NOT NULL,
    CONSTRAINT task_pkey PRIMARY KEY (id),
    CONSTRAINT task_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.task_list (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.task OWNER to admin;