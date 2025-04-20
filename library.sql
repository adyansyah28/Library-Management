--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-21 01:30:03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16427)
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    id integer NOT NULL,
    name character varying(50),
    username character varying(50) NOT NULL,
    password character varying(256),
    role character varying(10),
    created_at timestamp without time zone
);


ALTER TABLE public.account OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16426)
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.account_id_seq OWNER TO postgres;

--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 217
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;


--
-- TOC entry 222 (class 1259 OID 16474)
-- Name: book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book (
    id integer NOT NULL,
    title character varying(255),
    writer character varying(50),
    quantity integer,
    created_by character varying(50),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    is_deleted boolean
);


ALTER TABLE public.book OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16473)
-- Name: book_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.book_id_seq OWNER TO postgres;

--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 221
-- Name: book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.book_id_seq OWNED BY public.book.id;


--
-- TOC entry 224 (class 1259 OID 16481)
-- Name: loanbook; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loanbook (
    id integer NOT NULL,
    member_id integer,
    book_id integer,
    loan_at timestamp without time zone,
    return_at timestamp without time zone,
    is_return boolean
);


ALTER TABLE public.loanbook OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16480)
-- Name: loanbook_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loanbook_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.loanbook_id_seq OWNER TO postgres;

--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 223
-- Name: loanbook_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loanbook_id_seq OWNED BY public.loanbook.id;


--
-- TOC entry 220 (class 1259 OID 16443)
-- Name: refreshtoken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refreshtoken (
    id integer NOT NULL,
    token character varying(255)
);


ALTER TABLE public.refreshtoken OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16442)
-- Name: refreshtoken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.refreshtoken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refreshtoken_id_seq OWNER TO postgres;

--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 219
-- Name: refreshtoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.refreshtoken_id_seq OWNED BY public.refreshtoken.id;


--
-- TOC entry 4757 (class 2604 OID 16430)
-- Name: account id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);


--
-- TOC entry 4759 (class 2604 OID 16477)
-- Name: book id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book ALTER COLUMN id SET DEFAULT nextval('public.book_id_seq'::regclass);


--
-- TOC entry 4760 (class 2604 OID 16484)
-- Name: loanbook id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loanbook ALTER COLUMN id SET DEFAULT nextval('public.loanbook_id_seq'::regclass);


--
-- TOC entry 4758 (class 2604 OID 16446)
-- Name: refreshtoken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refreshtoken ALTER COLUMN id SET DEFAULT nextval('public.refreshtoken_id_seq'::regclass);


--
-- TOC entry 4919 (class 0 OID 16427)
-- Dependencies: 218
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account (id, name, username, password, role, created_at) FROM stdin;
2	Angga Dwi	Adyansyah	$2b$10$TdYaUQkJRn2tK17Y12DRRul4TpGTly8ARnWlnYNgkLVc9Yx0Fyela	admin	2025-04-20 16:13:43.231307
7	Angga	Adyansyah28	$2b$10$vYk/2W94hF8gEqfw3ckJqe7ph4SoZSwcQA4mMKW2dWMsb7Rp26fIi	member	2025-04-20 16:22:06.57451
8	Asep	Supersep	$2b$10$h75dViVCB4/6E0H43qOi0OMlXO2RS/HvJAnHPjRjpgxcYN1gb4ZKe	member	2025-04-20 17:25:10.374694
9	Moko	mokomo	$2b$10$MCZ8VjbgMxXJqlsSX7ftWuq8hNoXz0nJOTKsMCdpQSmrLtvPNBi.a	member	2025-04-20 22:01:25.892583
\.


--
-- TOC entry 4923 (class 0 OID 16474)
-- Dependencies: 222
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book (id, title, writer, quantity, created_by, created_at, updated_at, is_deleted) FROM stdin;
1	Kehidupan Alam	Agung S.H	8	adyansyah	2025-04-20 16:43:32.811636	2025-04-20 16:43:32.811636	f
2	HUKUM ALAM	Ayu Lestari	8	adyansyah	2025-04-20 17:39:50.066371	2025-04-20 17:39:50.066371	f
3	Siksa Neraka	Mulyono	10	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
5	Nasib Narkoboy	Tri Jagat	2	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
6	Penyihir Hitam	Denia Saputri	4	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
7	Anak Pemberani	Wahyudi	7	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
8	Tomat Emas	Eka Safitri	9	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
9	Hukum Pernikahan	Asep	10	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
10	Si Anak Jagung	Yudi	4	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
11	Seriga Auu	Irwanto	5	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
12	Si Cece	Irvan Kurniawan	9	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
13	Kesedihan	Ferza	7	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
15	Copet handal	Yayan	9	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
18	Mama Marah	Aditya	10	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
19	Cintaku Padamu	Aditya	8	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
20	Bidah	Mansyur	17	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
21	Kucing Tersesat	Jefri	13	Adyansyah	2025-04-20 18:10:49.004459	2025-04-20 18:10:49.004459	f
4	Indonesia Cerah	Irwanto	28	adyansyah	2025-04-20 17:48:55.114489	2025-04-21 00:39:47.26394	f
17	Anak Meteor	Koi	-2	adyansyah	2025-04-20 17:48:55.114489	2025-04-20 17:48:55.114489	f
22	Merah Muda	Aditya	3	Adyansyah	2025-04-21 01:09:29.46718	2025-04-21 01:09:29.46718	f
\.


--
-- TOC entry 4925 (class 0 OID 16481)
-- Dependencies: 224
-- Data for Name: loanbook; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.loanbook (id, member_id, book_id, loan_at, return_at, is_return) FROM stdin;
1	7	1	2025-04-20 16:48:20.099162	2025-04-27 16:48:20.099162	f
9	2	17	2025-04-20 18:53:48.193975	2025-04-27 18:53:48.193975	t
10	2	17	2025-04-21 00:40:43.90038	2025-04-28 00:40:43.90038	t
11	2	17	2025-04-21 01:08:23.041355	2025-04-28 01:08:23.041355	f
\.


--
-- TOC entry 4921 (class 0 OID 16443)
-- Dependencies: 220
-- Data for Name: refreshtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refreshtoken (id, token) FROM stdin;
7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkFuZ2dhIER3aSIsInVzZXJuYW1lIjoiQWR5YW5zeWFoIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ1MTU4NDUyLCJleHAiOjE3NDUxNjU2NTJ9.ijp1zTsIgQEnKDfp_FYOJpTOyYzazAWaSyTa4NCi6LE
10	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJBZHlhbnN5YWgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDUxNjk5OTYsImV4cCI6MTc0NTE3NzE5Nn0.baHvBpkL9Wre1iGb0URGZoCPrGcBXGG7H6zCj7YUAGM
\.


--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 217
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_id_seq', 9, true);


--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 221
-- Name: book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.book_id_seq', 22, true);


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 223
-- Name: loanbook_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loanbook_id_seq', 11, true);


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 219
-- Name: refreshtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refreshtoken_id_seq', 10, true);


--
-- TOC entry 4762 (class 2606 OID 16432)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- TOC entry 4764 (class 2606 OID 16434)
-- Name: account account_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_username_key UNIQUE (username);


--
-- TOC entry 4768 (class 2606 OID 16479)
-- Name: book book_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (id);


--
-- TOC entry 4770 (class 2606 OID 16486)
-- Name: loanbook loanbook_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loanbook
    ADD CONSTRAINT loanbook_pkey PRIMARY KEY (id);


--
-- TOC entry 4766 (class 2606 OID 16448)
-- Name: refreshtoken refreshtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refreshtoken
    ADD CONSTRAINT refreshtoken_pkey PRIMARY KEY (id);


--
-- TOC entry 4771 (class 2606 OID 16492)
-- Name: loanbook loanbook_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loanbook
    ADD CONSTRAINT loanbook_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(id);


--
-- TOC entry 4772 (class 2606 OID 16487)
-- Name: loanbook loanbook_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loanbook
    ADD CONSTRAINT loanbook_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.account(id);


-- Completed on 2025-04-21 01:30:03

--
-- PostgreSQL database dump complete
--

