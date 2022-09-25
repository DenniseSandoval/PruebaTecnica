--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12
-- Dumped by pg_dump version 14.4

-- Started on 2022-09-24 21:31:08 -05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3234 (class 1262 OID 16386)
-- Name: useraccount; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE useraccount WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE useraccount OWNER TO postgres;

\connect useraccount

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3223 (class 0 OID 17040)
-- Dependencies: 205
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.person ("personId", name, gender, age, id, address, phone) VALUES (1, 'Jose Lema', NULL, NULL, NULL, 'Otavalo sn y principal', '098254785');
INSERT INTO public.person ("personId", name, gender, age, id, address, phone) VALUES (2, 'Juan Osorio', NULL, NULL, NULL, '13 junio y Equinoccial', '098874587');
INSERT INTO public.person ("personId", name, gender, age, id, address, phone) VALUES (3, 'Marianela Montalvo', NULL, NULL, NULL, 'Amazonas y NNUU', '097548965');


--
-- TOC entry 3226 (class 0 OID 17053)
-- Dependencies: 208
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.client ("personId", name, gender, age, id, address, phone, "clientId", password, state, "personPersonId") VALUES (1, 'Jose Lema', NULL, NULL, NULL, 'Otavalo sn y principal', '098254785', 1, '1234', true, 1);
INSERT INTO public.client ("personId", name, gender, age, id, address, phone, "clientId", password, state, "personPersonId") VALUES (2, 'Juan Osorio', NULL, NULL, NULL, '13 junio y Equinoccial', '098874587', 2, '1245', true, 2);
INSERT INTO public.client ("personId", name, gender, age, id, address, phone, "clientId", password, state, "personPersonId") VALUES (3, 'Marianela Montalvo', NULL, NULL, NULL, 'Amazonas y NNUU', '097548965', 3, '5678', true, 3);


--
-- TOC entry 3221 (class 0 OID 17029)
-- Dependencies: 203
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account ("accountId", "accountNumber", "accountType", "initialBalance", state, client_id) VALUES (2, '225487', 'Corriente', 100, 'true', 3);
INSERT INTO public.account ("accountId", "accountNumber", "accountType", "initialBalance", state, client_id) VALUES (3, '495878', 'Ahorros', 0, 'true', 2);
INSERT INTO public.account ("accountId", "accountNumber", "accountType", "initialBalance", state, client_id) VALUES (4, '496825', 'Ahorros', 540, 'true', 3);
INSERT INTO public.account ("accountId", "accountNumber", "accountType", "initialBalance", state, client_id) VALUES (5, '585545', 'Corriente', 1000, 'true', 1);
INSERT INTO public.account ("accountId", "accountNumber", "accountType", "initialBalance", state, client_id) VALUES (1, '478758', 'Ahorros', 2000, 'true', 1);


--
-- TOC entry 3228 (class 0 OID 17099)
-- Dependencies: 210
-- Data for Name: movement; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.movement ("movementId", date, "movementType", value, balance, account_id) VALUES (1, '2022-09-24', 'Ahorros', -575, 1425, 1);
INSERT INTO public.movement ("movementId", date, "movementType", value, balance, account_id) VALUES (2, '2022-09-24', 'Corriente', 600, 700, 2);
INSERT INTO public.movement ("movementId", date, "movementType", value, balance, account_id) VALUES (3, '2022-09-24', 'Ahorros', 150, 150, 3);
INSERT INTO public.movement ("movementId", date, "movementType", value, balance, account_id) VALUES (4, '2022-09-24', 'Ahorros', -540, 0, 4);


--
-- TOC entry 3235 (class 0 OID 0)
-- Dependencies: 202
-- Name: account_accountId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."account_accountId_seq"', 5, true);


--
-- TOC entry 3236 (class 0 OID 0)
-- Dependencies: 207
-- Name: client_clientId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."client_clientId_seq"', 3, true);


--
-- TOC entry 3237 (class 0 OID 0)
-- Dependencies: 206
-- Name: client_personId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."client_personId_seq"', 3, true);


--
-- TOC entry 3238 (class 0 OID 0)
-- Dependencies: 209
-- Name: movement_movementId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."movement_movementId_seq"', 4, true);


--
-- TOC entry 3239 (class 0 OID 0)
-- Dependencies: 204
-- Name: person_personId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."person_personId_seq"', 3, true);


-- Completed on 2022-09-24 21:31:08 -05

--
-- PostgreSQL database dump complete
--

