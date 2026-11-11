# Teacher AI — yakuniy implementatsiya hisoboti

Sana: 2026-11-08.

**Teacher AI chat frontend, backend, PostgreSQL va Redis worker bilan qurildi
va tekshirildi.** API kaliti va berilgan faol Teacher hisobi bilan lokal pilot
sozlandi. Haqiqiy OpenRouter sinovida ikki so‘rov ham HTTP 429 qaytardi;
muvaffaqiyatli haqiqiy javob hali olinmadi. Avtomatik regressiya testlari
fictional transportda ishlaydi; OpenRouter kaliti usage qiymati USD 0 bo‘lib qoldi.

## Tayyor funksiyalar

- Pastki o‘ng burchakdagi tugmadan ochiladigan o‘ng panel, keng ekranda alohida ustun,
  mobil drawer va to‘liq `/[locale]/teacher/ai-assistant` sahifasi.
- Panel/sahifa o‘rtasida yagona draft va so‘rov holati; tarix, oldingi xabarlarni
  yuklash, yangi suhbat, nomlash, arxivlash va refresh’dan keyin tiklash.
- Haqiqiy queued/running/success/error/cancel holatlari; faqat xavfsiz xatolar
  uchun qo‘lda retry. Noaniq timeout qayta inference yubormaydi.
- Uzbek/Russian/English, light/dark, Enter/Shift+Enter/IME, mobil Back/Escape va
  fokusni qaytarish. HTML, script, tashqi rasm va havolalarni faollashtirmaydigan
  cheklangan Markdown ko‘rinishi.
- Har bir yangi suhbatda tashqi processing roziligi va retention xabari.
  Dastlabki muddat: yaratilganidan 7 kun, konfiguratsiya orqali boshqariladi.
- DB orqali Teacher role/ownership, idempotency, bir Teacher uchun bitta faol
  so‘rov, atomik quota, outbox, alohida BullMQ worker va lease recovery.
- Faqat pin qilingan `:free` model; yangi nol narx tekshiruvi, fallback o‘chirilgan,
  data collection rad etilgan, ZDR va maksimal narx 0. Musbat xarajat qayd etilsa,
  yangi inference bloklanadi. Suhbatni o‘chirish quota yoki bu blokni tiklamaydi.
- Auth sessiyasining backend tasdiqlagan user ID’si orqali hisoblar orasida
  frontend holati ajratildi; AI GraphQL amallari Apollo’da `no-cache` ishlatadi.
- Generated GraphQL kontraktlari, additive migratsiya, worker Docker artefakti
  va optional `teacher-ai` Compose profili.

## Test natijalari

### 2026-11-08 — Teacher UI birxilligi

- O‘ng panel va AI Assistant sahifasi umumiy Teacher sarlavha, karta, matn,
  rang tokenlari hamda Button/IconButton komponentlariga moslandi.
- Navbar AI tugmasi 56 px o‘lchamda pastki o‘ng burchakka ko‘chirildi:
  desktopda chetlardan 32 px, mobilda o‘ngdan 20 px va pastdan 96 px,
  qurilmaning safe-area masofasi bilan.
- Mobil topbar avatari siqilishi va bo‘sh suhbatning pastga avtomatik
  siljishi tuzatildi.
- Edge’da 375, 768, 1024, 1440 va 1600 px ekranlar, uch til,
  light/dark, panelni ochish/yopish va alohida sahifaga o‘tish tekshirildi.
  Bu vizual tekshiruvlar fictional preview rejimida, provider so‘rovisiz bajarildi.

### Avvalgi funksional tekshiruvlar

| Tekshiruv                                            | Natija                                       |
| ---------------------------------------------------- | -------------------------------------------- |
| PostgreSQL + GraphQL + Redis + worker integratsiyasi | **16/16 o‘tdi**                              |
| Haqiqiy Edge brauzeridagi ssenariylar                | **16/16 o‘tdi**                              |
| Frontend mavjud va yangi testlari                    | **101/101 o‘tdi**                            |
| AI policy/context testlari                           | **10/10 o‘tdi**                              |
| OpenRouter gateway fictional transport testlari      | **7/7 o‘tdi**                                |
| Config regressiya testlari                           | **22/22 o‘tdi**                              |
| API unit regressiya testlari                         | **32/32 o‘tdi**                              |
| Ta’sirlangan backend lint/typecheck                  | O‘tdi                                        |
| Frontend ESLint/strict typecheck                     | O‘tdi                                        |
| Frontend production build                            | O‘tdi — haqiqiy lokal API bilan 340 sahifa   |
| API va assistant-worker build                        | O‘tdi                                        |
| Production Compose sintaksisi                        | Fictional secret placeholderlari bilan o‘tdi |

Backend integratsiya testlari yangi vaqtinchalik PostgreSQL bazasiga barcha
migratsiyalarni qo‘lladi. Consent, boshqa Teacher/Student/Admin ruxsatlari,
takroriy va parallel yuborish, quota, cancel/archive poygasi, retry, lease
tiklash, retention, pagination, Redis redelivery, 429/timeout, xarajat bloki va
retentiondan keyingi quota saqlanishi tekshirildi.

Brauzerda real frontend → GraphQL → DB → Redis worker zanjiri ishlatildi;
faqat tashqi provider transporti fictional edi. Network javobini ataylab uzib,
takroriy urinish bitta xabar saqlashini tekshirdim. Panel/sahifa drafti, refresh,
rename/archive, generation paytida cancel, ikki tab, boshqa Teacher izolyatsiyasi,
mobil Back/Escape/fokus, uch til va haqiqiy theme tugmasi ham tekshirildi.
Brauzer JS xatolari kuzatilmadi. Desktop/mobile screenshotlar ko‘zdan kechirildi.

Tekshiruvlar davomida topilgan Prisma advisory-lock deserialization xatosi,
immutable outbox/audit bilan mos kelmagan cleanup, retention quota bo‘shlig‘i
va sessiya yuklanayotganda draft/panel yo‘qolishi tuzatildi.

Reproduksiya: backendda `corepack yarn assistant:test:integration` va
`corepack yarn turbo run test --filter=@best/api --filter=@best/assistant-worker --concurrency=1`.
Frontendda `corepack yarn test`, `corepack yarn lint`, `corepack yarn typecheck`,
`corepack yarn build`. Mavjud Apollo regression testi public course bor API
talab qiladi; test uchun alohida bazaga fictional course qo‘shildi.
Mahalliy brauzer harness va screenshotlar `.tmp/ai-e2e/` ichida saqlandi.
Yakuniy build va 101 test haqiqiy lokal API bilan ham takroran o‘tdi;
qolgan build artefaktida fictional test bazasi ishlatilmaydi.

## Lokal holat va chegaralar

`20261107010000_teacher_ai_chat` lokal `127.0.0.1:5432/best` bazasiga
qo‘llangan; 43 ta migratsiya up to date. Production baza/deploy o‘zgartirilmadi.
Kalit frontend `.env.example` dan ignored `best-server/.env` ga ko‘chirildi;
committed fayllarda haqiqiy provider kaliti yo‘q.

2026-11-08 da berilgan Teacher hisobining ACTIVE/TEACHER holati tekshirildi
va backend UUID bo‘yicha bitta pilot hisobi ruxsat etildi. Lokal API va workerda
AI yoqildi: Teacher uchun kuniga 10, umumiy kuniga 40, parallel 1 so‘rov;
xarajat $0 va saqlash muddati 7 kun. Frontend `http://localhost:3107`, API
`http://127.0.0.1:4199`; worker alohida jarayon. 3000 portidagi boshqa loyiha
jarayoniga tegilmadi.

Pin qilingan model: `xingchen-agi/xing4.0-29b-a4b:free`, endpoint `phala`.
Har bir dispatchdan oldin modelning barcha narxlari nol ekanligi va aynan shu
endpoint ZDR ro‘yxatida `safety_retention=false`, online ekanligi tekshiriladi.
Requestdagi `zdr:true`, `data_collection:deny`, fallback yo‘qligi va nol
maksimal narx saqlandi. OpenRouter account privacy sozlamalari o‘zgartirilmadi.
Bu nazorat [OpenRouter ZDR hujjatlari](https://openrouter.ai/docs/guides/features/zdr)
asosida Safety Retention endpointlarini ham alohida rad etadi.

Haqiqiy, shaxsiy ma’lumotsiz dars savoli bilan ikkita alohida urinishda provider
HTTP 429 qaytardi (`Provider returned error`). Ikkinchi urinish bir necha
minutdan keyin bajarildi; cheksiz retry yoki pullik fallback ishlatilmadi.
Kalitning total/daily usage qiymati USD 0. Model javobi, sifati va muvaffaqiyatli
latency hali tasdiqlanmagan; bundan keyin provider quvvati tiklanishi kerak.

2026-11-08 o‘zgarishlaridan keyin gateway 7/7, config 22/22,
PostgreSQL/Redis integratsiya 16/16, ta’sirlangan lint/typecheck/build qayta o‘tdi.
Jadvaldagi frontend 101/101 va 16 brauzer ssenariysi avvalgi fictional-provider
tekshiruvlari natijasidir; ular haqiqiy model javobi olinganini anglatmaydi.

Avtomatik ruxsat tekshiruvi foydalanuvchi parolini process argumenti va tool stdin
argumenti orqali uzatishni rad etdi. Parol faylga yozilmadi yoki agent tomonidan
login so‘roviga yuborilmadi. Foydalanuvchi o‘zi kirib AI so‘rovini yubordi:
bazada bitta run `FAILED / RATE_LIMITED`, provider call `REJECTED` holatida
saqlangan. Bu so‘rov API, baza va worker orqali providerga yetganini tasdiqlaydi;
Teacher kunlik 10 ta kvotasi tugamagan. Xato matni uch tilda vaqtinchalik
cheklovni tushuntiradigan qilib yangilandi. Test tokenlari yaratilmagan.

Vaqtinchalik fictional bazalar va queue tozalangan. Mavjud foydalanuvchi
ma’lumotlari, boshqa backend test/schema o‘zgarishlari va frontend logo fayllari
saqlandi. Commit/push yoki Docker image build/deploy bajarilmadi.

## Qolgan tekshiruv

Bepul endpointning 429 cheklovi bartaraf bo‘lgach, haqiqiy suhbat
yuborish → javob → refresh orqali tarixni
tekshirish qoladi. Ishga tushirish va rollback:
[Teacher AI runbook](TEACHER_AI_RUNBOOK.md). Asosiy reja:
[AI integration plan](AI_INTEGRATION_PLAN.md).
