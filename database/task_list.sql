-- Table: public.task_list
-- DROP TABLE IF EXISTS public.task_list;
CREATE TABLE IF NOT EXISTS public.task_list (
    id bigserial NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    user_id bigint NOT NULL,
    create_at date DEFAULT CURRENT_DATE,
    CONSTRAINT task_list_pkey PRIMARY KEY (id),
    CONSTRAINT task_list_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.task_list OWNER to admin;