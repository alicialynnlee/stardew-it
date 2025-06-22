--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Homebrew)
-- Dumped by pg_dump version 14.17 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: CalendarEvent; Type: TABLE; Schema: public; Owner: alicia
--

CREATE TABLE public."CalendarEvent" (
    id text NOT NULL,
    date text NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public."CalendarEvent" OWNER TO alicia;

--
-- Name: _TaskCalendarEvents; Type: TABLE; Schema: public; Owner: alicia
--

CREATE TABLE public."_TaskCalendarEvents" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_TaskCalendarEvents" OWNER TO alicia;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: alicia
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO alicia;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: alicia
--

CREATE TABLE public.accounts (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public.accounts OWNER TO alicia;

--
-- Name: bundles; Type: TABLE; Schema: public; Owner: alicia
--

CREATE TABLE public.bundles (
    id text NOT NULL,
    name text NOT NULL,
    "tasksRequired" integer NOT NULL,
    "roomId" text NOT NULL,
    reward text
);


ALTER TABLE public.bundles OWNER TO alicia;

--
-- Name: farm_tasks; Type: TABLE; Schema: public; Owner: alicia
--

CREATE TABLE public.farm_tasks (
    id text NOT NULL,
    "farmId" text NOT NULL,
    "taskId" text NOT NULL,
    completed boolean DEFAULT false NOT NULL
);


ALTER TABLE public.farm_tasks OWNER TO alicia;

--
-- Name: farms; Type: TABLE; Schema: public; Owner: alicia
--

CREATE TABLE public.farms (
    id text NOT NULL,
    name text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public.farms OWNER TO alicia;

--
-- Name: rooms; Type: TABLE; Schema: public; Owner: alicia
--

CREATE TABLE public.rooms (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.rooms OWNER TO alicia;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: alicia
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO alicia;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: alicia
--

CREATE TABLE public.tasks (
    id text NOT NULL,
    name text NOT NULL,
    "bundleId" text NOT NULL
);


ALTER TABLE public.tasks OWNER TO alicia;

--
-- Name: users; Type: TABLE; Schema: public; Owner: alicia
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "registrationDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    "selectedFarmId" text
);


ALTER TABLE public.users OWNER TO alicia;

--
-- Name: verification_tokens; Type: TABLE; Schema: public; Owner: alicia
--

CREATE TABLE public.verification_tokens (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.verification_tokens OWNER TO alicia;

--
-- Data for Name: CalendarEvent; Type: TABLE DATA; Schema: public; Owner: alicia
--

COPY public."CalendarEvent" (id, date, name, description) FROM stdin;
cm9om51g000009kuhrkbwb471	Spring	Forage	\N
cmakr26ap001v9kuha16ab6gs	Summer	Forage	\N
cmakr48np001y9kuhk20pwib1	Fall	Forage	\N
cmakr5ceh00259kuht045ugpg	Winter	Forage	\N
cmaopptj900289kuh45quowy1	Spring 18	Plant	\N
cmaopptj900299kuha7w0kjdq	Spring 22	Plant	\N
cmaopttz0002a9kuhe2lmtgxc	Summer 17	Plant	\N
cmaopttz0002b9kuhuqbsjysi	Summer 23	Plant	\N
cmaopttz0002c9kuhqsn10kvc	Summer 15	Plant	\N
cmaopmo4t00269kuh5ov96p0w	Spring 24	Plant	\N
cmaopwe5f002f9kuhbcxro51w	Fall 23	Plant	\N
cmaopwe5f002h9kuhgbqpfu9b	Fall 18	Plant	\N
cmaopptj900279kuhxh6gt53t	Spring 16	Plant	\N
cmaopwe5f002g9kuhb786ehsc	Fall 15	Plant	\N
cmaopwe5f002e9kuhlynlxjl5	Fall 14	Plant	\N
cmaopttz0002d9kuhd1vup6sb	Summer 16	Plant	\N
cmayr5uu5002j9kuhy0bm2opk	Fall 13	Buy Pig	\N
cmayr5uu5002k9kuh2uzy06oj	Fall 8	Upgrade to Big Barn	\N
cmayr5uu6002l9kuhfhanlqjw	Winter 13	Buy Goat	\N
cmayws7da001c9ky4d7ijmvwg	Winter 26	Buy Rice	Buy Rice from Pierre's to make the maki roll.
cmayws7da001d9ky4178qmeap	Winter 24	Upgrade House	Upgrade house from Robin to add a kitchen to make the maki roll.
cmayra3ut002o9kuh47ldqx9d	Winter 23	Buy Sheep	\N
cmayr5uu3002i9kuhxlsnprtt	Fall 11	Uprade to Deluxe Barn	\N
cmayr5uu6002m9kuh6vw38axu	Fall 5	Build Barn	\N
cmayr5uu6002n9kuh2jk417kb	Winter 13	Buy Cow	\N
cmaysd3s100089ky4iuicgk7h	Summer 21	Plant	\N
cmaysgzrz000g9ky4rm4ku2vz	Fall 20	Plant	\N
cmaysm3iy000q9ky4bogp7rtl	Fall 24	Plant	\N
cmayvcpp8000w9ky4njgmjwsc	Fall 1	Upgrade to Deluxe Coop	\N
cmayvcpp8000x9ky44pj7ejtq	Fall 3	Buy Rabbit	\N
cmayvcpp8000y9ky4rwbnzsa0	Summer 27	Upgrade to Big Coop	\N
cmayvcpp8000z9ky4f9ir1ejy	Summer	Buy Duck	\N
cmayvcpp800109ky4i4nxiuze	Summer 24	Build Coop	\N
cmayvcpp800119ky4jk5grpc8	Summer	Buy White Chicken	\N
cmayvcpp800129ky48m7vkgcf	Summer	Buy Brown Chicken	\N
cmayvol7w00139ky4u1h47l48	Summer 19	Plant	\N
cmayvt13300149ky4n3ch6xg0	Summer 24	Plant	\N
cmayvvw9t00159ky4khzrb1qy	Summer 27	Plant	\N
cmayw261000169ky4fa3v0f4u	Spring 27	Plant	\N
cmaywci31001a9ky44r9x5i3y	Fall	Bee House	Craft bee house to make honey
cmaywgzzt001b9ky4snv1dnbe	Winter 24	Make Jelly	Craft preserves jar and put any fruit in it and wait 2-3 days for jelly.
cmayw5mo300179ky4w0mmbvjs	Fall	Tap Pine Tree	Tap any pine tree and wait 5 days for pine tar.
cmayw5mo300189ky4nli559dy	Fall	Tap Oak Tree	Tap any oak tree and wait 7 days for oak resin.
cmayw5mo300199ky4zw7odpm0	Fall	Tap Maple Tree	Tap any maple tree and wait 9 days for maple syrup.
cmayx55qr001n9ky4cbbb9h9t	Winter	Purchase	Donate money for the vault.
cmayx94z0001o9ky49ptx5x51	Winter 20	Make Wine	Craft Keg, put any fruit in the keg, then wait 7 days for wine.
cmazq8h9v001p9ky40zoh41z5	Fall 27	Plant	Plant tree in Greenhouse.
\.


--
-- Data for Name: _TaskCalendarEvents; Type: TABLE DATA; Schema: public; Owner: alicia
--

COPY public."_TaskCalendarEvents" ("A", "B") FROM stdin;
cm9om51g000009kuhrkbwb471	cm9g55fa600029konodfj3ctq
cm9om51g000009kuhrkbwb471	cm9g56fcg00039konirosgoev
cm9om51g000009kuhrkbwb471	cm9g56s2200049konjda4bxsy
cm9om51g000009kuhrkbwb471	cm9g58ik300059konqiz48mg4
cmakr26ap001v9kuha16ab6gs	cm9g5a0t600079konzgtxbozi
cmakr26ap001v9kuha16ab6gs	cm9g5ahom00089konmbg3wq0n
cmakr26ap001v9kuha16ab6gs	cm9g5awmc00099kon8it4qg3l
cmakr48np001y9kuhk20pwib1	cm9g5gft000019kyk4zxapex1
cmakr48np001y9kuhk20pwib1	cm9g5gx3100029kykmja80fwi
cmakr48np001y9kuhk20pwib1	cm9g5h7rb00039kykozirjzgk
cmakr48np001y9kuhk20pwib1	cm9g5hgzh00049kykahtzr57j
cmakr5ceh00259kuht045ugpg	cm9g5it2m00069kyk8tofpueh
cmakr5ceh00259kuht045ugpg	cm9g5jac200079kykpghrt8yz
cmakr5ceh00259kuht045ugpg	cm9g5jac200089kyk77igvx9d
cmakr5ceh00259kuht045ugpg	cm9g5jici00099kykv1kl8qh3
cmaopmo4t00269kuh5ov96p0w	cm9j43clu00029k2x964sctvt
cmaopmo4t00269kuh5ov96p0w	cm9j49axf000h9k2x7mvvx0vl
cmaopptj900279kuhxh6gt53t	cm9j43clu00049k2xc0i6eru2
cmaopptj900289kuh45quowy1	cm9j43clu00039k2x0vphw5na
cmaopptj900299kuha7w0kjdq	cm9j43clu00059k2xmb8uzemr
cmaysd3s100089ky4iuicgk7h	cmaysc1zq00059ky4hadj0yzy
cmaysgzrz000g9ky4rm4ku2vz	cmaysgfvc000c9ky4vp7u2zqh
cmakr5ceh00259kuht045ugpg	cmaysj9zi000j9ky4hon2qdlp
cmaysm3iy000q9ky4bogp7rtl	cmayslvuy000n9ky4jzlobbp1
cmaopttz0002a9kuhe2lmtgxc	cm9j456zo00079k2xtsamrq4y
cmaopttz0002b9kuhuqbsjysi	cm9j456zo00089k2xthfxjpxm
cmaopttz0002c9kuhqsn10kvc	cm9j456zo00099k2xynt1rr35
cmaopttz0002d9kuhd1vup6sb	cm9j456zo000a9k2x777ji1kq
cmaopptj900279kuhxh6gt53t	cm9j49axg000i9k2x9m2ku5u3
cmaopwe5f002e9kuhlynlxjl5	cm9j471x7000c9k2xyt27hlsv
cmaopwe5f002f9kuhbcxro51w	cm9j471x7000d9k2xhm9g56a9
cmaopwe5f002g9kuhb786ehsc	cm9j471x7000e9k2x4h8y2vxv
cmaopwe5f002g9kuhb786ehsc	cm9j49axg000j9k2xkd0n1j1k
cmaopwe5f002h9kuhgbqpfu9b	cm9j471x7000f9k2xf53ol8l4
cmaopptj900289kuh45quowy1	cm9g5a0t600079konzgtxbozi
cmaopwe5f002e9kuhlynlxjl5	cm9j49axg000k9k2xe6v5cc3i
cmayr5uu5002j9kuhy0bm2opk	cm9j4eick000t9k2xeoq3xyna
cmayr5uu5002k9kuh2uzy06oj	cm9j4eick000t9k2xeoq3xyna
cmayr5uu3002i9kuhxlsnprtt	cm9j4eick000t9k2xeoq3xyna
cmayr5uu6002m9kuh6vw38axu	cm9j4eick000t9k2xeoq3xyna
cmayr5uu5002j9kuhy0bm2opk	cmaysc1zp00049ky4ol3i3n4r
cmayr5uu5002k9kuh2uzy06oj	cmaysc1zp00049ky4ol3i3n4r
cmayr5uu3002i9kuhxlsnprtt	cmaysc1zp00049ky4ol3i3n4r
cmayr5uu6002m9kuh6vw38axu	cmaysc1zp00049ky4ol3i3n4r
cmayr5uu5002k9kuh2uzy06oj	cm9j4bfrx000q9k2xeu0ma0ac
cmayra3ut002o9kuh47ldqx9d	cm9j4bfrx000q9k2xeu0ma0ac
cmayr5uu3002i9kuhxlsnprtt	cm9j4bfrx000q9k2xeu0ma0ac
cmayr5uu6002m9kuh6vw38axu	cm9j4bfrx000q9k2xeu0ma0ac
cmayr5uu5002k9kuh2uzy06oj	cm9j4eick000u9k2xabm0b9u6
cmayra3ut002o9kuh47ldqx9d	cm9j4eick000u9k2xabm0b9u6
cmayr5uu3002i9kuhxlsnprtt	cm9j4eick000u9k2xabm0b9u6
cmayr5uu6002m9kuh6vw38axu	cm9j4eick000u9k2xabm0b9u6
cmayr5uu5002k9kuh2uzy06oj	cm9j4bfrx000p9k2xe1ae7epq
cmayr5uu6002l9kuhfhanlqjw	cm9j4bfrx000p9k2xe1ae7epq
cmayr5uu6002m9kuh6vw38axu	cm9j4bfrx000p9k2xe1ae7epq
cmayr5uu5002k9kuh2uzy06oj	cm9j4eick000v9k2xoep1j63i
cmayr5uu6002l9kuhfhanlqjw	cm9j4eick000v9k2xoep1j63i
cmayr5uu6002m9kuh6vw38axu	cm9j4eick000v9k2xoep1j63i
cmayr5uu6002m9kuh6vw38axu	cm9j4bfrx000m9k2xmlvm1i7l
cmayr5uu6002n9kuh2jk417kb	cm9j4bfrx000m9k2xmlvm1i7l
cmayr5uu6002m9kuh6vw38axu	cm9j4eick000w9k2xxeo1mibr
cmayr5uu6002n9kuh2jk417kb	cm9j4eick000w9k2xxeo1mibr
cmayvcpp800109ky4i4nxiuze	cm9j4bfrx000n9k2xmlrg7as1
cmayvcpp800129ky48m7vkgcf	cm9j4bfrx000n9k2xmlrg7as1
cmayvcpp800109ky4i4nxiuze	cm9j4bfrx000o9k2xs54ca7qn
cmayvcpp800119ky4jk5grpc8	cm9j4bfrx000o9k2xs54ca7qn
cmayvcpp8000y9ky4rwbnzsa0	cm9j4bfry000r9k2xb2a705ak
cmayvcpp8000z9ky4f9ir1ejy	cm9j4bfry000r9k2xb2a705ak
cmayvcpp800109ky4i4nxiuze	cm9j4bfry000r9k2xb2a705ak
cmayvcpp800109ky4i4nxiuze	cmaysc1zq00079ky42cqdj7pi
cmayvcpp800119ky4jk5grpc8	cmaysc1zq00079ky42cqdj7pi
cmayvcpp800129ky48m7vkgcf	cmaysc1zq00079ky42cqdj7pi
cmayvcpp8000y9ky4rwbnzsa0	cmaysgfvc000d9ky4ioebj36f
cmayvcpp8000z9ky4f9ir1ejy	cmaysgfvc000d9ky4ioebj36f
cmayvcpp800109ky4i4nxiuze	cmaysgfvc000d9ky4ioebj36f
cmayvcpp8000w9ky4njgmjwsc	cmayso3e7000u9ky4i3ordx3v
cmayvcpp8000x9ky44pj7ejtq	cmayso3e7000u9ky4i3ordx3v
cmayvcpp8000y9ky4rwbnzsa0	cmayso3e7000u9ky4i3ordx3v
cmayvcpp800109ky4i4nxiuze	cmayso3e7000u9ky4i3ordx3v
cmayvol7w00139ky4u1h47l48	cmaysgfvd000f9ky4ke735fyk
cmayvt13300149ky4n3ch6xg0	cm9j4eick000z9k2x1ctyz5om
cmayvt13300149ky4n3ch6xg0	cmayslvuy000p9ky46f5mg8fm
cmayvvw9t00159ky4khzrb1qy	cmayso3e8000v9ky4eg0mfoi2
cmayw261000169ky4fa3v0f4u	cm9j4eicl00119k2x9whpqx73
cmayw261000169ky4fa3v0f4u	cm9j4eicl00129k2xknnyoh6l
cmayw5mo300179ky4w0mmbvjs	cm9g5ofja000l9kykkt5li7kk
cmayw5mo300189ky4nli559dy	cm9g5ofja000m9kyk99wy2p30
cmayw5mo300189ky4nli559dy	cmayso3e7000s9ky4rm1ux959
cmayw5mo300199ky4zw7odpm0	cm9g5ofja000n9kykmkmdx3et
cmayw5mo300199ky4zw7odpm0	cmaysc1zp00029ky4t2n8l34u
cmaywci31001a9ky44r9x5i3y	cm9j4eick000x9k2x5a7or9z6
cmaywgzzt001b9ky4snv1dnbe	cm9j4eick000y9k2xj0mtkvj9
cmayvvw9t00159ky4khzrb1qy	cm9j4eicl00139k2x49x9h27x
cmayws7da001c9ky4d7ijmvwg	cmaysc1zq00069ky4cz2uwuz9
cmayws7da001d9ky4178qmeap	cmaysc1zq00069ky4cz2uwuz9
cmayx55qr001n9ky4cbbb9h9t	cmayx4jz4001j9ky43aok9ehj
cmayx55qr001n9ky4cbbb9h9t	cmayx4jz4001k9ky4zwq4vtjy
cmayx55qr001n9ky4cbbb9h9t	cmayx4jz5001l9ky41nsjag1v
cmayx55qr001n9ky4cbbb9h9t	cmayx4jz5001m9ky4okcay0of
cmazq8h9v001p9ky40zoh41z5	cm9j4eicl00109k2x1hggby42
cmazq8h9v001p9ky40zoh41z5	cm9j4eicl00149k2xzb145vpz
cmayx94z0001o9ky49ptx5x51	cmayso3e7000t9ky4p8nif960
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: alicia
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
784c1b17-d830-4682-a58d-33fa607d281e	5e370bf0e372f3fd9d834aa60b642ef846dc94ab35939c917042d8cd0d2ddee5	2025-04-12 17:16:31.258261-07	20250413001631_init	\N	\N	2025-04-12 17:16:31.248222-07	1
fa82c15f-78c5-46e0-a7dc-53c9b960e38e	536e933c74c27fc1c1a90d5cbf018a3ba333810c7aca75893a518939c6e6b554	2025-04-13 13:24:55.58623-07	20250413202455_add_tasks_and_bundles	\N	\N	2025-04-13 13:24:55.579922-07	1
f1550408-8efc-4c98-9fb2-a5caba0dc23c	f3fcb8f8349c71e9360fcca2464a7f9917e0557000cc4b731797c3e2020f9457	2025-04-13 13:56:21.580057-07	20250413205621_add_rooms	\N	\N	2025-04-13 13:56:21.57473-07	1
4d4939d5-ede8-4254-aef7-33cf169de251	5aec69da72303571529fd4fdd1de70000439d5114ac534160d0a394dbca04696	2025-04-13 14:18:37.109656-07	20250413211836_add_reward_remove_duedate	\N	\N	2025-04-13 14:18:37.107173-07	1
240430a4-e529-4421-b790-b0fe6011b303	c88ff95c04bf6d43386d6cbb8ad35c0e94b78c4d0526945987f784b40c335d78	2025-04-13 18:15:43.390275-07	20250414011543_add_selected_farm	\N	\N	2025-04-13 18:15:43.387662-07	1
7a081313-3645-4eef-ae92-d30a6fce5234	a5a4df48b12eddf0941f2ffe1187495113ad02e7cf63be55a4ffd24cee5d08a7	2025-04-19 12:14:20.837569-07	20250419191420_add_calendar_events	\N	\N	2025-04-19 12:14:20.83248-07	1
da8c559b-217b-46a9-a7fe-53760d57bb1a	9bca63a2122f5a48966a954d186a9635a928b4bb5a247c687060655535e69d17	2025-04-19 12:23:32.602973-07	20250419192332_make_cal_description_optional	\N	\N	2025-04-19 12:23:32.600207-07	1
08f6ba19-cfcc-4335-a0d7-d6dc895c7b45	c5e57a2b3474678ab1967732c3dd6c6a6b99acacfe8191a8ffda28babb80c86a	2025-05-21 19:49:19.533042-07	20250522024919_change_task_cal_many	\N	\N	2025-05-21 19:49:19.52612-07	1
53fb6846-d260-4cd4-aabb-c595b1bdd2a6	31291b147b2ed239d8c1c426b4769ab91181fb0e66b209050bf913b348118328	2025-05-21 19:54:48.937613-07	20250522025448_change_task_cal_many_2	\N	\N	2025-05-21 19:54:48.844346-07	1
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: alicia
--

COPY public.accounts (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
\.


--
-- Data for Name: bundles; Type: TABLE DATA; Schema: public; Owner: alicia
--

COPY public.bundles (id, name, "tasksRequired", "roomId", reward) FROM stdin;
cm9g54a8q00019kon3puunrg2	Spring Foraging	4	cm9g52a9800009konwt74stlb	Spring Seeds (30)
cm9g59fqb00069konh9jyldrt	Summer Foraging	3	cm9g52a9800009konwt74stlb	Summer Seeds (30)
cm9g5dx1k00009kyk2h8azscu	Fall Foraging	4	cm9g52a9800009konwt74stlb	Fall Seeds (30)
cm9g5idzj00059kyktfgk70rn	Winter Foraging	4	cm9g52a9800009konwt74stlb	Winter Seeds (30)
cm9g5k7eg000a9kyk967jy9u9	Construction	4	cm9g52a9800009konwt74stlb	Charcoal Kiln (1)
cm9g5m2yl000f9kykgmy4wt34	Exotic Foraging	5	cm9g52a9800009konwt74stlb	Autumn's Bounty (5)
cm9j42at800019k2x8eldm04r	Spring Crops	4	cm9j41pfz00009k2xnzg4vjpz	Speed-Gro (20)
cm9j44uqf00069k2xynvd54kl	Summer Crops	4	cm9j41pfz00009k2xnzg4vjpz	Quality Sprinkler (1)
cm9j464kt000b9k2xc9wsbubu	Fall Crops	4	cm9j41pfz00009k2xnzg4vjpz	Bee House (1)
cm9j47tcq000g9k2xx6uh0ul4	Quality Crops	3	cm9j41pfz00009k2xnzg4vjpz	Preserves Jar (1)
cm9j4a6ue000l9k2x5tjgmdds	Animal	5	cm9j41pfz00009k2xnzg4vjpz	Cheese Press (1)
cm9j4cjwy000s9k2xfmxpfwcu	Artisan	6	cm9j41pfz00009k2xnzg4vjpz	Keg (1)
cmakqfv1y00059kuhgkc7qyjm	River Fish	4	cmakqc4id00049kuhnkont4ul	Deluxe Bait (30)
cmakqfv1z00069kuhuw0x99jj	Lake Fish	4	cmakqc4id00049kuhnkont4ul	Dressed Spinner (1)
cmakqfv20000a9kuhxvh5cycr	Specialty Fish	4	cmakqc4id00049kuhnkont4ul	Dish O' The Sea (5)
cmakqfv1z00079kuhb7h7d9o1	Ocean Fish	4	cmakqc4id00049kuhnkont4ul	Warp Totem: Beach (5)
cmakqfv2000089kuhqqjjms1w	Night Fishing	3	cmakqc4id00049kuhnkont4ul	Glow Ring (1)
cmakqfv2000099kuhzz0r4p2g	Crab Pot	5	cmakqc4id00049kuhnkont4ul	Crab Pot (3)
cmakqunza001h9kuhnf79xcx7	Blacksmith's	3	cmakqt09m001g9kuhm0iftse6	Furnace (1)
cmakqunzb001i9kuhyou1nylc	Geologist's	4	cmakqt09m001g9kuhm0iftse6	Omni Geode (5)
cmakqunzb001j9kuhgaykza2h	Adventurer's	2	cmakqt09m001g9kuhm0iftse6	Small Magnet Ring (1)
cmaysaldb00019ky4ow55z24q	Chef's	6	cmays9r3500009ky46y373j26	Pink Cake (3)
cmayshzw9000h9ky4nc6b0l4q	Field Research	4	cmays9r3500009ky46y373j26	Recycling Machine (1)
cmaysenox00099ky4ph0g58fh	Dye	6	cmays9r3500009ky46y373j26	Seed Maker (1)
cmayskjbp000m9ky4ar95obbn	Fodder	3	cmays9r3500009ky46y373j26	Heater (1)
cmaysnffr000r9ky43g3i7onu	Enchanter's	4	cmays9r3500009ky46y373j26	Gold Bar (5)
cmayx3gy1001f9ky480cu3l9n	2,500	1	cmayx1ihn001e9ky4ss051xc6	Chocolate Cake (3)
cmayx3gy1001g9ky47g498f3j	5,000	1	cmayx1ihn001e9ky4ss051xc6	Quality Fertilizer (30)
cmayx3gy2001h9ky4qy1pn44n	10,000	1	cmayx1ihn001e9ky4ss051xc6	Lightning Rod (1)
cmayx3gy2001i9ky4uyrj68xd	25,000	1	cmayx1ihn001e9ky4ss051xc6	Crystalarium (1)
\.


--
-- Data for Name: farm_tasks; Type: TABLE DATA; Schema: public; Owner: alicia
--

COPY public.farm_tasks (id, "farmId", "taskId", completed) FROM stdin;
cmayk5yhk00029k545j4goi0o	cmayk5yhe00019k541pfpn4bm	cm9g55fa600029konodfj3ctq	f
cmayk5yhk00039k54y6ye271k	cmayk5yhe00019k541pfpn4bm	cm9g56fcg00039konirosgoev	f
cmayk5yhk00049k54ddm9om1s	cmayk5yhe00019k541pfpn4bm	cm9g56s2200049konjda4bxsy	f
cmayk5yhk00059k54ip6v8tq0	cmayk5yhe00019k541pfpn4bm	cm9g58ik300059konqiz48mg4	f
cmayk5yhk00069k54as3popg7	cmayk5yhe00019k541pfpn4bm	cm9g5a0t600079konzgtxbozi	f
cmayk5yhk00079k54xdvkcf9g	cmayk5yhe00019k541pfpn4bm	cm9g5ahom00089konmbg3wq0n	f
cmayk5yhk00089k545vido8yb	cmayk5yhe00019k541pfpn4bm	cm9g5awmc00099kon8it4qg3l	f
cmayk5yhk00099k545wz74mab	cmayk5yhe00019k541pfpn4bm	cm9g5gft000019kyk4zxapex1	f
cmayk5yhk000a9k54o5zti54r	cmayk5yhe00019k541pfpn4bm	cm9g5gx3100029kykmja80fwi	f
cmayk5yhk000b9k5485h6gowp	cmayk5yhe00019k541pfpn4bm	cm9g5h7rb00039kykozirjzgk	f
cmayk5yhk000c9k54bx6llfle	cmayk5yhe00019k541pfpn4bm	cm9g5hgzh00049kykahtzr57j	f
cmayk5yhk000d9k54nohdbr8u	cmayk5yhe00019k541pfpn4bm	cm9g5it2m00069kyk8tofpueh	f
cmayk5yhk000e9k542vdxprmn	cmayk5yhe00019k541pfpn4bm	cm9g5jac200079kykpghrt8yz	f
cmayk5yhk000f9k54emk7ypaj	cmayk5yhe00019k541pfpn4bm	cm9g5jac200089kyk77igvx9d	f
cmayk5yhk000g9k5484ahpgqw	cmayk5yhe00019k541pfpn4bm	cm9g5jici00099kykv1kl8qh3	f
cmayk5yhk000i9k54htza4wx9	cmayk5yhe00019k541pfpn4bm	cm9g5le3s000c9kykum3d62zz	f
cmayk5yhk000j9k549pgqpbbw	cmayk5yhe00019k541pfpn4bm	cm9g5le3s000d9kykdtsbvs08	f
cmayk5yhk000k9k54x0on1st9	cmayk5yhe00019k541pfpn4bm	cm9g5le3t000e9kyk9phv2ivr	f
cmayk5yhk000l9k546g6j5qbh	cmayk5yhe00019k541pfpn4bm	cm9g5ncuw000g9kykdekw7fyn	f
cmayk5yhk000m9k54eeqzniy2	cmayk5yhe00019k541pfpn4bm	cm9g5ncux000h9kykkhdgmaon	f
cmayk5yhk000n9k54vuv9p9nm	cmayk5yhe00019k541pfpn4bm	cm9g5ncux000i9kykdb57yat3	f
cmayk5yhk000o9k54ovxunvri	cmayk5yhe00019k541pfpn4bm	cm9g5ncux000j9kykfuf8tqpk	f
cmayk5yhk000p9k54wwp5j775	cmayk5yhe00019k541pfpn4bm	cm9g5ofja000k9kyk3gl5dsr6	f
cmayk5yhk000q9k54vg830gj3	cmayk5yhe00019k541pfpn4bm	cm9g5ofja000l9kykkt5li7kk	f
cmayk5yhk000h9k549mpbm1bc	cmayk5yhe00019k541pfpn4bm	cm9g5le3s000b9kykw5738zzl	f
cmayk5yhk00169k541jhuzsmp	cmayk5yhe00019k541pfpn4bm	cm9j4bfrx000m9k2xmlvm1i7l	f
cmayk5yhk00179k54s6nsbb39	cmayk5yhe00019k541pfpn4bm	cm9j4bfrx000n9k2xmlrg7as1	f
cmayk5yhk00189k54ygzax7b2	cmayk5yhe00019k541pfpn4bm	cm9j4bfrx000o9k2xs54ca7qn	f
cmayk5yhk00199k54gawu15k0	cmayk5yhe00019k541pfpn4bm	cm9j4bfrx000p9k2xe1ae7epq	f
cmayk5yhk001a9k54cp73v3ok	cmayk5yhe00019k541pfpn4bm	cm9j4bfrx000q9k2xeu0ma0ac	f
cmayk5yhk001b9k54x2imtnb1	cmayk5yhe00019k541pfpn4bm	cm9j4bfry000r9k2xb2a705ak	f
cmayk5yhk000r9k54cj67jrfc	cmayk5yhe00019k541pfpn4bm	cm9g5ofja000m9kyk99wy2p30	f
cmayk5yhk000s9k54fn9n0vwe	cmayk5yhe00019k541pfpn4bm	cm9g5ofja000n9kykmkmdx3et	f
cmayk5yhk000t9k54pxzhjwyn	cmayk5yhe00019k541pfpn4bm	cm9g5ofjb000o9kyktyna52m7	f
cmayk5yhk000u9k5492265137	cmayk5yhe00019k541pfpn4bm	cm9j43clu00029k2x964sctvt	f
cmayk5yhk000v9k54wx8r4q3i	cmayk5yhe00019k541pfpn4bm	cm9j43clu00039k2x0vphw5na	f
cmayk5yhk000w9k545el5c3hs	cmayk5yhe00019k541pfpn4bm	cm9j43clu00049k2xc0i6eru2	f
cmayk5yhk000x9k54m3hftn7n	cmayk5yhe00019k541pfpn4bm	cm9j43clu00059k2xmb8uzemr	f
cmayk5yhk000y9k54sua6q5x8	cmayk5yhe00019k541pfpn4bm	cm9j456zo00079k2xtsamrq4y	f
cmayk5yhk000z9k547uooxk7a	cmayk5yhe00019k541pfpn4bm	cm9j456zo00089k2xthfxjpxm	f
cmayk5yhk00109k540vucvmi2	cmayk5yhe00019k541pfpn4bm	cm9j456zo00099k2xynt1rr35	f
cmayk5yhk00119k54y8d6fdjq	cmayk5yhe00019k541pfpn4bm	cm9j456zo000a9k2x777ji1kq	f
cmayk5yhk00129k54sdicqlul	cmayk5yhe00019k541pfpn4bm	cm9j471x7000c9k2xyt27hlsv	f
cmayk5yhk00139k54uri7xml3	cmayk5yhe00019k541pfpn4bm	cm9j471x7000d9k2xhm9g56a9	f
cmayk5yhk00149k54342s90p5	cmayk5yhe00019k541pfpn4bm	cm9j471x7000e9k2x4h8y2vxv	f
cmayk5yhk00159k54u3b6tnl4	cmayk5yhe00019k541pfpn4bm	cm9j471x7000f9k2xf53ol8l4	f
cmayk5yhk001c9k54ommne9t6	cmayk5yhe00019k541pfpn4bm	cm9j49axf000h9k2x7mvvx0vl	f
cmayk5yhk001d9k543dji1391	cmayk5yhe00019k541pfpn4bm	cm9j49axg000i9k2x9m2ku5u3	f
cmayk5yhk001e9k54kdtl0xih	cmayk5yhe00019k541pfpn4bm	cm9j49axg000j9k2xkd0n1j1k	f
cmayk5yhk001f9k54g4ifk4u4	cmayk5yhe00019k541pfpn4bm	cm9j49axg000k9k2xe6v5cc3i	f
cmayk5yhk001g9k549vea7kz9	cmayk5yhe00019k541pfpn4bm	cm9j4eick000t9k2xeoq3xyna	f
cmayk5yhk001h9k5494b2l3pv	cmayk5yhe00019k541pfpn4bm	cm9j4eick000u9k2xabm0b9u6	f
cmayk5yhk001i9k543gim7so5	cmayk5yhe00019k541pfpn4bm	cm9j4eick000v9k2xoep1j63i	f
cmayk5yhk001j9k54ogwni0kc	cmayk5yhe00019k541pfpn4bm	cm9j4eick000w9k2xxeo1mibr	f
cmayk5yhk001k9k54vflwub6a	cmayk5yhe00019k541pfpn4bm	cm9j4eick000x9k2x5a7or9z6	f
cmayk5yhk001l9k54vhurapah	cmayk5yhe00019k541pfpn4bm	cm9j4eick000y9k2xj0mtkvj9	f
cmayk5yhl002s9k54szo5sj5r	cmayk5yhe00019k541pfpn4bm	cmakqx54q001r9kuhehjfnuek	t
cmayk5yhl002l9k540qrxhanz	cmayk5yhe00019k541pfpn4bm	cmakqv9of001k9kuhga863qn9	f
cmayk5yhl002m9k54fdyhi6bm	cmayk5yhe00019k541pfpn4bm	cmakqv9of001l9kuhnn1gck0w	t
cmayk5yhl002t9k54umllisxs	cmayk5yhe00019k541pfpn4bm	cmakqx54q001s9kuhs2dza3p0	t
cmayk5yhk001m9k54c6rp1ig3	cmayk5yhe00019k541pfpn4bm	cm9j4eick000z9k2x1ctyz5om	f
cmayk5yhk001n9k54mhht9qh3	cmayk5yhe00019k541pfpn4bm	cm9j4eicl00109k2x1hggby42	f
cmayk5yhk001o9k54i444zv7c	cmayk5yhe00019k541pfpn4bm	cm9j4eicl00119k2x9whpqx73	f
cmayk5yhk001p9k54c9ty86ip	cmayk5yhe00019k541pfpn4bm	cm9j4eicl00129k2xknnyoh6l	f
cmayk5yhk001q9k54ey27zcqi	cmayk5yhe00019k541pfpn4bm	cm9j4eicl00139k2x49x9h27x	f
cmayk5yhk001r9k54bbd7c1d1	cmayk5yhe00019k541pfpn4bm	cm9j4eicl00149k2xzb145vpz	f
cmayk5yhk001s9k54uvhsz7lg	cmayk5yhe00019k541pfpn4bm	cmakqguzc000b9kuhotbvo19a	f
cmayk5yhk001t9k54bl7qwt8l	cmayk5yhe00019k541pfpn4bm	cmakqguzc000c9kuhuk97affr	f
cmayk5yhl001u9k544ik8r0iq	cmayk5yhe00019k541pfpn4bm	cmakqguzc000d9kuhdiebdzko	f
cmayk5yhl001v9k54cndk0soa	cmayk5yhe00019k541pfpn4bm	cmakqguzd000e9kuh0mdcmw6n	f
cmayk5yhl001w9k54r9a320t9	cmayk5yhe00019k541pfpn4bm	cmakqke01000f9kuh1feu5arq	f
cmayk5yhl001x9k54iuh3mv94	cmayk5yhe00019k541pfpn4bm	cmakqke01000g9kuhqhmg005h	f
cmayk5yhl001y9k540zboytjm	cmayk5yhe00019k541pfpn4bm	cmakqke01000h9kuhjp84bnzw	f
cmayk5yhl001z9k54q1ukhbf9	cmayk5yhe00019k541pfpn4bm	cmakqke02000i9kuh8ttixbyw	f
cmayk5yhl00209k54q1d8bzb9	cmayk5yhe00019k541pfpn4bm	cmakqmog0000v9kuhadvxo5uk	f
cmayk5yhl00219k54vakah2wj	cmayk5yhe00019k541pfpn4bm	cmakqn2fx000w9kuh0wyfwftt	f
cmayk5yhl00229k54zvw1dw57	cmayk5yhe00019k541pfpn4bm	cmakqng86000x9kuh044pi606	f
cmayk5yhl00239k54zygyp6sn	cmayk5yhe00019k541pfpn4bm	cmakqnln9000y9kuhbq94dn12	f
cmayk5yhl00249k54uiu64ivl	cmayk5yhe00019k541pfpn4bm	cmakqo4kf000z9kuheqjpbnn0	f
cmayk5yhl00259k54fqm5hkre	cmayk5yhe00019k541pfpn4bm	cmakqo4kf00109kuhcavxe0sh	f
cmayk5yhl00269k54zalbkuwh	cmayk5yhe00019k541pfpn4bm	cmakqo4kf00119kuhubs7vi2l	f
cmayk5yhl00279k54udwj7sdz	cmayk5yhe00019k541pfpn4bm	cmakqrpk900129kuhfb9xtood	f
cmayk5yhl00289k54qpeyslvg	cmayk5yhe00019k541pfpn4bm	cmakqrpk900139kuhpg1bywu5	f
cmayk5yhl00299k54td3n5jop	cmayk5yhe00019k541pfpn4bm	cmakqrpk900149kuh9flh47c8	f
cmayk5yhl002a9k543zc4yqyb	cmayk5yhe00019k541pfpn4bm	cmakqrpka00159kuhlnmkkage	f
cmayk5yhl002b9k54k3xybqr2	cmayk5yhe00019k541pfpn4bm	cmakqrpka00169kuhwruai5wu	f
cmayk5yhl002c9k54v380dtbz	cmayk5yhe00019k541pfpn4bm	cmakqrpka00179kuhnbuzanjy	f
cmayk5yhl002d9k54wwsfumnr	cmayk5yhe00019k541pfpn4bm	cmakqrpka00189kuhs62eqxjx	f
cmayk5yhl002e9k54xynszxy8	cmayk5yhe00019k541pfpn4bm	cmakqrpka00199kuh89p54d9s	f
cmayk5yhl002f9k54paw3j4fw	cmayk5yhe00019k541pfpn4bm	cmakqrpka001a9kuh0g69tzwp	f
cmayk5yhl002g9k54kajeh1bu	cmayk5yhe00019k541pfpn4bm	cmakqrpka001b9kuharnlb3qf	f
cmayk5yhl002h9k549dof1pxh	cmayk5yhe00019k541pfpn4bm	cmakqsm5o001c9kuhknl4m55u	f
cmayk5yhl002i9k54j4frvcdt	cmayk5yhe00019k541pfpn4bm	cmakqsm5o001d9kuhxawprs75	f
cmayk5yhl002j9k549qkmdvl5	cmayk5yhe00019k541pfpn4bm	cmakqsm5o001e9kuhwi32sczr	f
cmayk5yhl002k9k54a42vk6dp	cmayk5yhe00019k541pfpn4bm	cmakqsm5p001f9kuhs87s115z	f
cmayk5yhl002o9k54u530zd99	cmayk5yhe00019k541pfpn4bm	cmakqvxt6001n9kuhxqhyy6eg	f
cmayk5yhl002p9k54cxp2skii	cmayk5yhe00019k541pfpn4bm	cmakqvxt7001o9kuh2awpz221	f
cmayk5yhl002q9k54hm49v5pu	cmayk5yhe00019k541pfpn4bm	cmakqvxt7001p9kuhjw06lwc3	f
cmayk5yhl002r9k548qb1qczy	cmayk5yhe00019k541pfpn4bm	cmakqvxt7001q9kuhga98dzfz	f
cmayk5yhl002v9k5408gq6uxi	cmayk5yhe00019k541pfpn4bm	cmakqx54r001u9kuhcozh46ng	f
cmayk5yhl002u9k54alyg50cw	cmayk5yhe00019k541pfpn4bm	cmakqx54q001t9kuhtkpslo7h	t
cmayk5yhl002n9k54cb0w97ox	cmayk5yhe00019k541pfpn4bm	cmakqv9og001m9kuhh44uf1j5	t
\.


--
-- Data for Name: farms; Type: TABLE DATA; Schema: public; Owner: alicia
--

COPY public.farms (id, name, "userId") FROM stdin;
cmayk5yhe00019k541pfpn4bm	first moo	cm9ewbvtg00009kvfkzmlgexv
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: alicia
--

COPY public.rooms (id, name) FROM stdin;
cm9g52a9800009konwt74stlb	Crafts Room
cm9j41pfz00009k2xnzg4vjpz	Pantry
cmakqc4id00049kuhnkont4ul	Fish Tank
cmakqt09m001g9kuhm0iftse6	Boiler Room
cmays9r3500009ky46y373j26	Bulletin Board
cmayx1ihn001e9ky4ss051xc6	Vault
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: alicia
--

COPY public.sessions (id, "sessionToken", "userId", expires) FROM stdin;
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: alicia
--

COPY public.tasks (id, name, "bundleId") FROM stdin;
cm9g55fa600029konodfj3ctq	Wild Horseradish	cm9g54a8q00019kon3puunrg2
cm9g56fcg00039konirosgoev	Daffodil	cm9g54a8q00019kon3puunrg2
cm9g56s2200049konjda4bxsy	 Leek	cm9g54a8q00019kon3puunrg2
cm9g58ik300059konqiz48mg4	Dandelion	cm9g54a8q00019kon3puunrg2
cm9g5a0t600079konzgtxbozi	Grape	cm9g59fqb00069konh9jyldrt
cm9g5ahom00089konmbg3wq0n	Spice Berry	cm9g59fqb00069konh9jyldrt
cm9g5awmc00099kon8it4qg3l	Sweet Pea	cm9g59fqb00069konh9jyldrt
cm9g5gft000019kyk4zxapex1	Common Mushroom	cm9g5dx1k00009kyk2h8azscu
cm9g5gx3100029kykmja80fwi	Wild Plum	cm9g5dx1k00009kyk2h8azscu
cm9g5h7rb00039kykozirjzgk	Hazelnut	cm9g5dx1k00009kyk2h8azscu
cm9g5hgzh00049kykahtzr57j	Blackberry	cm9g5dx1k00009kyk2h8azscu
cm9g5it2m00069kyk8tofpueh	Winter Root	cm9g5idzj00059kyktfgk70rn
cm9g5jac200079kykpghrt8yz	Snow Yam	cm9g5idzj00059kyktfgk70rn
cm9g5jac200089kyk77igvx9d	Crystal Fruit	cm9g5idzj00059kyktfgk70rn
cm9g5jici00099kykv1kl8qh3	Crocus	cm9g5idzj00059kyktfgk70rn
cm9g5le3s000b9kykw5738zzl	Wood (99)	cm9g5k7eg000a9kyk967jy9u9
cm9g5le3s000c9kykum3d62zz	Wood (99)	cm9g5k7eg000a9kyk967jy9u9
cm9g5le3s000d9kykdtsbvs08	Stone (99)	cm9g5k7eg000a9kyk967jy9u9
cm9g5le3t000e9kyk9phv2ivr	Hardwood (10)	cm9g5k7eg000a9kyk967jy9u9
cm9g5ncuw000g9kykdekw7fyn	Coconut	cm9g5m2yl000f9kykgmy4wt34
cm9g5ncux000h9kykkhdgmaon	Cactus Fruit	cm9g5m2yl000f9kykgmy4wt34
cm9g5ncux000i9kykdb57yat3	Cave Carrot	cm9g5m2yl000f9kykgmy4wt34
cm9g5ncux000j9kykfuf8tqpk	Red Mushroom	cm9g5m2yl000f9kykgmy4wt34
cm9g5ofja000k9kyk3gl5dsr6	Morel	cm9g5m2yl000f9kykgmy4wt34
cm9g5ofja000l9kykkt5li7kk	Pine Tar	cm9g5m2yl000f9kykgmy4wt34
cm9g5ofja000m9kyk99wy2p30	Oak Resin	cm9g5m2yl000f9kykgmy4wt34
cm9g5ofja000n9kykmkmdx3et	Maple Syrup	cm9g5m2yl000f9kykgmy4wt34
cm9g5ofjb000o9kyktyna52m7	Purple Mushroom	cm9g5m2yl000f9kykgmy4wt34
cm9j43clu00029k2x964sctvt	Parsnip	cm9j42at800019k2x8eldm04r
cm9j43clu00039k2x0vphw5na	Green Bean	cm9j42at800019k2x8eldm04r
cm9j43clu00049k2xc0i6eru2	Cauliflower	cm9j42at800019k2x8eldm04r
cm9j43clu00059k2xmb8uzemr	Potato	cm9j42at800019k2x8eldm04r
cm9j456zo00079k2xtsamrq4y	Tomato	cm9j44uqf00069k2xynvd54kl
cm9j456zo00089k2xthfxjpxm	Hot Pepper	cm9j44uqf00069k2xynvd54kl
cm9j456zo00099k2xynt1rr35	Blueberry	cm9j44uqf00069k2xynvd54kl
cm9j456zo000a9k2x777ji1kq	Melon	cm9j44uqf00069k2xynvd54kl
cm9j471x7000c9k2xyt27hlsv	Corn	cm9j464kt000b9k2xc9wsbubu
cm9j471x7000d9k2xhm9g56a9	Eggplant	cm9j464kt000b9k2xc9wsbubu
cm9j471x7000e9k2x4h8y2vxv	Pumpkin	cm9j464kt000b9k2xc9wsbubu
cm9j471x7000f9k2xf53ol8l4	Yam	cm9j464kt000b9k2xc9wsbubu
cm9j4bfrx000m9k2xmlvm1i7l	Large Milk	cm9j4a6ue000l9k2x5tjgmdds
cm9j4bfrx000n9k2xmlrg7as1	Large Brown Egg	cm9j4a6ue000l9k2x5tjgmdds
cm9j4bfrx000o9k2xs54ca7qn	Large White Egg	cm9j4a6ue000l9k2x5tjgmdds
cm9j4bfrx000p9k2xe1ae7epq	Large Goat Milk	cm9j4a6ue000l9k2x5tjgmdds
cm9j4bfrx000q9k2xeu0ma0ac	Wool	cm9j4a6ue000l9k2x5tjgmdds
cm9j4bfry000r9k2xb2a705ak	Duck Egg	cm9j4a6ue000l9k2x5tjgmdds
cm9j49axf000h9k2x7mvvx0vl	Gold Parsnip (5)	cm9j47tcq000g9k2xx6uh0ul4
cm9j49axg000i9k2x9m2ku5u3	Gold Melon (5)	cm9j47tcq000g9k2xx6uh0ul4
cm9j49axg000j9k2xkd0n1j1k	Gold Pumpkin (5)	cm9j47tcq000g9k2xx6uh0ul4
cm9j49axg000k9k2xe6v5cc3i	Gold Corn (5)	cm9j47tcq000g9k2xx6uh0ul4
cm9j4eick000t9k2xeoq3xyna	Truffle Oil	cm9j4cjwy000s9k2xfmxpfwcu
cm9j4eick000u9k2xabm0b9u6	Cloth	cm9j4cjwy000s9k2xfmxpfwcu
cm9j4eick000v9k2xoep1j63i	Goat Cheese	cm9j4cjwy000s9k2xfmxpfwcu
cm9j4eick000w9k2xxeo1mibr	Cheese	cm9j4cjwy000s9k2xfmxpfwcu
cm9j4eick000x9k2x5a7or9z6	Honey	cm9j4cjwy000s9k2xfmxpfwcu
cm9j4eick000y9k2xj0mtkvj9	Jelly	cm9j4cjwy000s9k2xfmxpfwcu
cm9j4eick000z9k2x1ctyz5om	Apple	cm9j4cjwy000s9k2xfmxpfwcu
cm9j4eicl00109k2x1hggby42	Apricot	cm9j4cjwy000s9k2xfmxpfwcu
cm9j4eicl00119k2x9whpqx73	Orange	cm9j4cjwy000s9k2xfmxpfwcu
cm9j4eicl00129k2xknnyoh6l	Peach	cm9j4cjwy000s9k2xfmxpfwcu
cm9j4eicl00139k2x49x9h27x	Pomegranate	cm9j4cjwy000s9k2xfmxpfwcu
cm9j4eicl00149k2xzb145vpz	Cherry	cm9j4cjwy000s9k2xfmxpfwcu
cmakqguzc000c9kuhuk97affr	Catfish	cmakqfv1y00059kuhgkc7qyjm
cmakqguzc000d9kuhdiebdzko	Shad	cmakqfv1y00059kuhgkc7qyjm
cmakqguzd000e9kuh0mdcmw6n	Tiger Trout	cmakqfv1y00059kuhgkc7qyjm
cmakqke01000f9kuh1feu5arq	Largemouth Bass	cmakqfv1z00069kuhuw0x99jj
cmakqke01000g9kuhqhmg005h	Carp	cmakqfv1z00069kuhuw0x99jj
cmakqke01000h9kuhjp84bnzw	Bullhead	cmakqfv1z00069kuhuw0x99jj
cmakqke02000i9kuh8ttixbyw	Sturgeon	cmakqfv1z00069kuhuw0x99jj
cmakqmog0000v9kuhadvxo5uk	Sardine	cmakqfv1z00079kuhb7h7d9o1
cmakqn2fx000w9kuh0wyfwftt	Tuna	cmakqfv1z00079kuhb7h7d9o1
cmakqng86000x9kuh044pi606	Red Snapper	cmakqfv1z00079kuhb7h7d9o1
cmakqnln9000y9kuhbq94dn12	Tilapia	cmakqfv1z00079kuhb7h7d9o1
cmakqo4kf000z9kuheqjpbnn0	Walleye	cmakqfv2000089kuhqqjjms1w
cmakqo4kf00109kuhcavxe0sh	Bream	cmakqfv2000089kuhqqjjms1w
cmakqo4kf00119kuhubs7vi2l	Eel	cmakqfv2000089kuhqqjjms1w
cmakqrpk900129kuhfb9xtood	Lobster	cmakqfv2000099kuhzz0r4p2g
cmakqrpk900139kuhpg1bywu5	Crayfish	cmakqfv2000099kuhzz0r4p2g
cmakqrpk900149kuh9flh47c8	Crab	cmakqfv2000099kuhzz0r4p2g
cmakqrpka00159kuhlnmkkage	Cockle	cmakqfv2000099kuhzz0r4p2g
cmakqrpka00169kuhwruai5wu	Mussle	cmakqfv2000099kuhzz0r4p2g
cmakqrpka00179kuhnbuzanjy	Shrimp	cmakqfv2000099kuhzz0r4p2g
cmakqrpka00189kuhs62eqxjx	Snail	cmakqfv2000099kuhzz0r4p2g
cmakqrpka00199kuh89p54d9s	Periwinkle	cmakqfv2000099kuhzz0r4p2g
cmakqrpka001a9kuh0g69tzwp	Oyster	cmakqfv2000099kuhzz0r4p2g
cmakqrpka001b9kuharnlb3qf	Clam	cmakqfv2000099kuhzz0r4p2g
cmakqsm5o001c9kuhknl4m55u	Pufferfish	cmakqfv20000a9kuhxvh5cycr
cmakqsm5o001d9kuhxawprs75	Ghostfish	cmakqfv20000a9kuhxvh5cycr
cmakqsm5o001e9kuhwi32sczr	Sandfish	cmakqfv20000a9kuhxvh5cycr
cmakqsm5p001f9kuhs87s115z	Woodskip	cmakqfv20000a9kuhxvh5cycr
cmakqv9of001k9kuhga863qn9	Copper Bar	cmakqunza001h9kuhnf79xcx7
cmakqv9of001l9kuhnn1gck0w	Iron Bar	cmakqunza001h9kuhnf79xcx7
cmakqv9og001m9kuhh44uf1j5	Gold Bar	cmakqunza001h9kuhnf79xcx7
cmakqvxt6001n9kuhxqhyy6eg	Quartz	cmakqunzb001i9kuhyou1nylc
cmakqvxt7001o9kuh2awpz221	Earth Crystal	cmakqunzb001i9kuhyou1nylc
cmakqvxt7001p9kuhjw06lwc3	Frozen Tear	cmakqunzb001i9kuhyou1nylc
cmakqvxt7001q9kuhga98dzfz	Fire Quartz	cmakqunzb001i9kuhyou1nylc
cmakqx54q001r9kuhehjfnuek	Slime (99)	cmakqunzb001j9kuhgaykza2h
cmakqx54q001s9kuhs2dza3p0	Bat Wing (10)	cmakqunzb001j9kuhgaykza2h
cmakqx54q001t9kuhtkpslo7h	Solar Essence	cmakqunzb001j9kuhgaykza2h
cmakqx54r001u9kuhcozh46ng	Void Essence	cmakqunzb001j9kuhgaykza2h
cmaysc1zp00029ky4t2n8l34u	Maple Syrup	cmaysaldb00019ky4ow55z24q
cmaysc1zp00039ky48qu7r00c	Fiddlehead Fern	cmaysaldb00019ky4ow55z24q
cmaysc1zp00049ky4ol3i3n4r	Truffle	cmaysaldb00019ky4ow55z24q
cmaysc1zq00059ky4hadj0yzy	Poppy	cmaysaldb00019ky4ow55z24q
cmaysc1zq00069ky4cz2uwuz9	Maki Roll	cmaysaldb00019ky4ow55z24q
cmaysc1zq00079ky42cqdj7pi	Fried Egg	cmaysaldb00019ky4ow55z24q
cmaysgfvc000a9ky4n1fbtox7	Red Mushroom	cmaysenox00099ky4ph0g58fh
cmaysgfvc000b9ky40udhq2xs	Sea Urchin	cmaysenox00099ky4ph0g58fh
cmaysgfvc000c9ky4vp7u2zqh	Sunflower	cmaysenox00099ky4ph0g58fh
cmaysgfvc000d9ky4ioebj36f	Duck Feather	cmaysenox00099ky4ph0g58fh
cmaysgfvd000e9ky49jsh3nbt	Aquamarine	cmaysenox00099ky4ph0g58fh
cmaysgfvd000f9ky4ke735fyk	Red Cabbage	cmaysenox00099ky4ph0g58fh
cmaysj9zi000i9ky4sxxuaecg	Purple Mushroom	cmayshzw9000h9ky4nc6b0l4q
cmaysj9zi000j9ky4hon2qdlp	Nautilus Shell	cmayshzw9000h9ky4nc6b0l4q
cmaysj9zj000k9ky41kpc7nh0	Chub	cmayshzw9000h9ky4nc6b0l4q
cmaysj9zj000l9ky46fp0z27i	Frozen Geode	cmayshzw9000h9ky4nc6b0l4q
cmayslvuy000n9ky4jzlobbp1	Wheat (10)	cmayskjbp000m9ky4ar95obbn
cmayslvuy000o9ky4rx4ea53p	Hay (10)	cmayskjbp000m9ky4ar95obbn
cmayslvuy000p9ky46f5mg8fm	Apple (3)	cmayskjbp000m9ky4ar95obbn
cmayso3e7000s9ky4rm1ux959	Oak Resin	cmaysnffr000r9ky43g3i7onu
cmayso3e7000t9ky4p8nif960	Wine	cmaysnffr000r9ky43g3i7onu
cmayso3e7000u9ky4i3ordx3v	Rabbit's Foot	cmaysnffr000r9ky43g3i7onu
cmayso3e8000v9ky4eg0mfoi2	Pomegranate	cmaysnffr000r9ky43g3i7onu
cmayx4jz4001j9ky43aok9ehj	2,500	cmayx3gy1001f9ky480cu3l9n
cmayx4jz4001k9ky4zwq4vtjy	5,000	cmayx3gy1001g9ky47g498f3j
cmayx4jz5001l9ky41nsjag1v	10,000	cmayx3gy2001h9ky4qy1pn44n
cmayx4jz5001m9ky4okcay0of	25,000	cmayx3gy2001i9ky4uyrj68xd
cmakqguzc000b9kuhotbvo19a	Sunfish	cmakqfv1y00059kuhgkc7qyjm
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: alicia
--

COPY public.users (id, name, email, password, "registrationDate", "emailVerified", "selectedFarmId") FROM stdin;
cm9ewbvtg00009kvfkzmlgexv	alicia	alicialee3141@gmail.com	$2b$10$..hWBiYWSSvT7PMh/h.IBeDUfwz6eV39GE63vlwfYGNtiS4..W.Ke	2025-04-13 00:17:59.765	\N	cmayk5yhe00019k541pfpn4bm
\.


--
-- Data for Name: verification_tokens; Type: TABLE DATA; Schema: public; Owner: alicia
--

COPY public.verification_tokens (identifier, token, expires) FROM stdin;
\.


--
-- Name: CalendarEvent CalendarEvent_pkey; Type: CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public."CalendarEvent"
    ADD CONSTRAINT "CalendarEvent_pkey" PRIMARY KEY (id);


--
-- Name: _TaskCalendarEvents _TaskCalendarEvents_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public."_TaskCalendarEvents"
    ADD CONSTRAINT "_TaskCalendarEvents_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: bundles bundles_pkey; Type: CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.bundles
    ADD CONSTRAINT bundles_pkey PRIMARY KEY (id);


--
-- Name: farm_tasks farm_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.farm_tasks
    ADD CONSTRAINT farm_tasks_pkey PRIMARY KEY (id);


--
-- Name: farms farms_pkey; Type: CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.farms
    ADD CONSTRAINT farms_pkey PRIMARY KEY (id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: _TaskCalendarEvents_B_index; Type: INDEX; Schema: public; Owner: alicia
--

CREATE INDEX "_TaskCalendarEvents_B_index" ON public."_TaskCalendarEvents" USING btree ("B");


--
-- Name: accounts_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: alicia
--

CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON public.accounts USING btree (provider, "providerAccountId");


--
-- Name: farm_tasks_farmId_taskId_key; Type: INDEX; Schema: public; Owner: alicia
--

CREATE UNIQUE INDEX "farm_tasks_farmId_taskId_key" ON public.farm_tasks USING btree ("farmId", "taskId");


--
-- Name: sessions_sessionToken_key; Type: INDEX; Schema: public; Owner: alicia
--

CREATE UNIQUE INDEX "sessions_sessionToken_key" ON public.sessions USING btree ("sessionToken");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: alicia
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_name_key; Type: INDEX; Schema: public; Owner: alicia
--

CREATE UNIQUE INDEX users_name_key ON public.users USING btree (name);


--
-- Name: verification_tokens_identifier_token_key; Type: INDEX; Schema: public; Owner: alicia
--

CREATE UNIQUE INDEX verification_tokens_identifier_token_key ON public.verification_tokens USING btree (identifier, token);


--
-- Name: verification_tokens_token_key; Type: INDEX; Schema: public; Owner: alicia
--

CREATE UNIQUE INDEX verification_tokens_token_key ON public.verification_tokens USING btree (token);


--
-- Name: _TaskCalendarEvents _TaskCalendarEvents_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public."_TaskCalendarEvents"
    ADD CONSTRAINT "_TaskCalendarEvents_A_fkey" FOREIGN KEY ("A") REFERENCES public."CalendarEvent"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _TaskCalendarEvents _TaskCalendarEvents_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public."_TaskCalendarEvents"
    ADD CONSTRAINT "_TaskCalendarEvents_B_fkey" FOREIGN KEY ("B") REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: accounts accounts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: bundles bundles_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.bundles
    ADD CONSTRAINT "bundles_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: farm_tasks farm_tasks_farmId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.farm_tasks
    ADD CONSTRAINT "farm_tasks_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES public.farms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: farm_tasks farm_tasks_taskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.farm_tasks
    ADD CONSTRAINT "farm_tasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: farms farms_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.farms
    ADD CONSTRAINT "farms_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tasks tasks_bundleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alicia
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "tasks_bundleId_fkey" FOREIGN KEY ("bundleId") REFERENCES public.bundles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: alicia
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

