-- Table: public.task_list

-- DROP TABLE IF EXISTS public.task_list;

CREATE TABLE IF NOT EXISTS public.task_list
(
    id bigint NOT NULL DEFAULT nextval('task_list_id_seq'::regclass),
    title text COLLATE pg_catalog."default" NOT NULL,
    user_id bigint NOT NULL,
    create_at date NOT NULL,
    CONSTRAINT task_list_pkey PRIMARY KEY (id),
    CONSTRAINT task_list_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.task_list
    OWNER to admin;