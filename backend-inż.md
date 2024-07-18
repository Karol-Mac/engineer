# Ogólny opis backendu
1. Opiskonkretnych wyjątków (exceptions) w razie niepowodzenia
2. Tabele obrazujące poszczególne endpointy **(podzielone na funkcjonalności)**
3. Dokładny opis endpointów (zgodny a tabelą)

## 1.Opis wyjątków
- prawidłowa operacja: 200 (dla GET, PUT, DELETE) i 201 dla POST
- nieprawidłowe zapytanie: 400
- nieprawidlowy token: 401 (oczywiście tylko dla endpointów wymagających bycia zalogowanym)
- użytkownik zalogowany prawidłowo, ale nie ma uprawnień: 403 (np: zwykły user chcę dodać produkt)
- wszelkie wyjątki po stronie serwera: 500 (jeszcze nie wiem co może pójść nie tak XD)

Nie sugerowałbym się bardzo wyglądem wyjątków - albo nawet wcale
To bardziej czytelny sposób niż wyrzucenie stack trace, ale nie jest idealny
Struktura wyjątku: {
	timestamp: DateTime 	//data i  czas wystąpienia danego wyjątku
    message: string			//info co się stało
    details: string			//któtki opis identufikujący w którym miejscu coś jest nie tak
}

## 2. Tabele z endpointami
### LOGOWANIE / REJESTRACJA
| method type | endpoint                   | body                                      | response  | ROLE       |
|-------------|----------------------------|-------------------------------------------|-----------|------------|
| POST        | /api/auth/login            | email, password                           | token     | user/admin |
| POST        | /api/auth/register         | username, email, password                 | komunikat | user/admin |
| POST        | /api/auth/company/login    | email, password                           | token     | seller     |
| POST        | /api/auth/company/register | shopName, email, password, KRS, imageFile | komunikat | seller     |

### WYSZUKIWANIE PRODUKTÓW
| method type | endpoint                  | body | response  |
|-------------|---------------------------|------|-----------|
| GET         | /api/products/{productId} |      | PRODUCT   |
| GET         | /api/products?name=string |      | [PRODUCT] |

### SELLER - PRODUCTS
| method type | endpoint                  | body          | response      | role         |
|-------------|---------------------------|---------------|---------------|--------------|
| POST        | /api/products             | FRESH_PRODUCT | FRESH_PRODUCT | seller       |
| PUT         | /api/products/{productId} | FRESH_PRODUCT | FRESH_PRODUCT | seller       |
| DELETE      | /api/products/{productId} |               | komunikat     | seller/admin |

### ZARZĄDANIE KONTEM
| method type | endpoint                     | body               | response                  | role                   |
|-------------|------------------------------|--------------------|---------------------------|------------------------|
| PUT         | /api/users                   | username, password | username, email, password | user/admin(swoje dane) |
| DELETE      | /api/users/{userId}          |                    | komunikat                 | admin                  |
| PUT         | /api/users/{userId}/block    |                    | boolean                   | admin                  |
| PUT         | /api/users/{userId}/comments |                    | boolean                   | admin                  |

### LISTA ULUBIONYCH
| method type | endpoint                       | body | response  | role |
|-------------|--------------------------------|------|-----------|------|
| GET         | /api/users/favorites           |      | [PRODUCT] | user |
| PUT         | /api/users/favorites?productId |      | PRODUCT   | user |
| DELETE      | /api/users/favorites?productId |      | komunikat | user |

### KOMENTARZE
| method type | endpoint                        | body    | response  | role       |
|-------------|---------------------------------|---------|-----------|------------|
| GET         | /api/comments                   |         | [COMMENT] | user/admin |
| GET         | /api/comments/{commentId}       |         | COMMENT   | admin      |
| POST        | /api/comments                   | COMMENT | COMMENT   | user       |
| DELETE      | /api/users/comments/{commentId} |         | komunikat | admin      |

### ZGŁOSZENIA
| method type | endpoint                           | body   | response | role  |
|-------------|------------------------------------|--------|----------|-------|
| POST        | /api/reports?productId=&commentId= |        | REPORT   | user  |
| GET         | /api/reports                       |        | [REPORT] | admin |
| PUT         | /api/reports/{reportId}            | REPORT | REPORT   | admin |

### POBIERANIE ZDJĘĆ (po image name)
| method type | endpoint     | body      | response | 
|-------------|--------------|-----------|----------|
| POST        | /api/images  | imageName | File     |



## 3. Dokładny opis endpointów

### LOGOWANIE / REJESTRACJA

#### konto prywatne (private account)
##### logowanie:
_POST: localhost:8080/api/auth/login_

body: {
    email: string
    password: string
}

response: `{
    accessToken: string,
    tokenType : string
}`

##### rejestracja:
_POST: localhost:8080/api/auth/register_

body: {
    username: string
    email: string
    password: string
}

response: **komunikat**

#### konto firmowe (seller)
##### logowanie:
_POST: localhost:8080/api/auth/company/login_

body: {
email: string
password: string
}

response: `{
    accessToken: string,
    tokenType : string
}`

##### rejestracja:
_POST: localhost:8080/api/auth/company/register_
body:
{
    shopName: string
    email: string
    password: string
    KRS: string
}, imageFile (plik ze zdjęciem)

response: **komunikat**

Pytania:
1. Kiedy dać ustawianie zdjęcia dla sprzedawcy?
Przy rejestracji, czy później - jak konto już istnieje?
(Zdjęcie nie ma być zapisywane w bazie, tylko w systemie plików - dlatego nie ma go w tabeli bazie)

### WYSZUKIWANIE PRODUKTÓW

**obiekt produktu -> PRODUCT**
{
    id: int
    name: string
    price: int
    isGram: boolean
    weight: int
    energeticValue: int
    fat: int
    protein: int
    carbs: int
    fiber: int
    salt: int
    isHidden: boolean
    isFavourite: boolean
    isReported: boolean
    imageName: string
}

##### Pojedynczy produkt:
_GET: localhost:8080/api/products/{productId}_
productId - request parameter

body: **brak**

response: {}

##### Przeglądanie listy produktów:
_GET: localhost:8080/api/products?name=string_
name - nazwa produktu (lub jej fragment) - **wymagane**

body: **brak**
response: `[{PRODUCT}, {PRODUCT}, ...]`

Pytania: 
// 1. Czy wyświetlać licznik zgłoszeń przy zgłoszonych produktach (i komentarzach)?
// Nie ma w wymaganich.

### SELLER - PRODUCTS

**Obiekt dodawanego produktu -> FRESH_PRODUCT**
{
	id: int
    name: string
    price: int
    isGram: boolean
    weight: int
    energeticValue: int
    fat: int
    protein: int
    carbs: int
    fiber: int
    salt: int
    imageName: string
}

##### Dodawanie produktu:
_POST: localhost:8080/api/products_
			//id opcjonalne
body: {FRESH_PRODUCT}, imageFile (plik ze zdjęciem)

response: {FRESH_PRODUCT}

##### Aktualizowanie produktu:
_PUT: localhost:8080/api/products/{productId}_

body: {FRESH_PRODUCT} 	//id jest opcjonalne

response: {FRESH_PRODUCT}

##### Usuwanie produku (admin też może):
_DELETE: localhost:8080/api/products/{productId}_

body: **brak**

response: **komunikat**	

### ZARZĄDANIE KONTEM

#### prywatnym (private account/admin (swoje dane)):

##### Aktualizowanie nazwy użytkownika/hasła
_POST: localhost:8080/api/users_

body: {
    username: string
	password: string
}

response: {
    username: string
    email: string
    password: string
}

#### admin:
**Obiekt usera/sellera -> ACCOUNT**
`{
    id: int                 //niezmieniable
    username: string        //niezmieniable
    email: string           //niezmieniable
    isBlocked: boolean      //czy zablokowany - seller ma zawsze na false
    isDeleted: boolean      
    role: string            // USER/SELLER/ADMIN
    //pola przydatne do szczegółów konta (niezmieniable):
    reportsCount: int               //user
    commentsCount: int              //user
    reportedComments: int           //user
    addedProductsCount: int         //seller
    reportedProductsCount: int      //seller
}`

##### lista wszystkich użytkowników/sellerów):
_GET: localhost:8080/api/users_

body: **brak**
response: `[
    {ACCOUNT},
    {ACCOUNT},
    ...
]`

#### wyszukanie użytkownika po username:
_GET: localhost:8080/api/users?name=string_
name - username/shopName (odpowiednio dla usera/sellera)
**Username nie jest unikalny, więc zwraca listę**
body: **brak**
response: `[
{ACCOUNT},
{ACCOUNT},
...
]`

##### Zmiana danych usera/sellera:
_PUT: localhost:8080/api/users_
U użytkownika (private user) można zmienić:
 - isBlocked - zablokowanie użytkownika
 - isDeleted - usunięcie użytkownika
 - role - zmiana roli (na SELLER lub ADMIN)
_usunięcie wszystkich komentarzy <br/>
użytkownika dostępne jest pod innym endpointem_

U sellera można zmienić:
- isDeleted - usunięcie sellera
 - role - zmiana roli (na USER lub ADMIN)

body: {ACCOUNT}     //użytkownik weryfikowany jest po emailu
response: {ACCOUNT}

##### Usuń wszystkie komentarze
_DELETE: localhost:8080/api/users/{userId}/comments_
body: **brak**
response: **komunikat**

### LISTA ULUBIONYCH

##### Wyświetlenie listy ulubionych:
_GET: localhost:8080/api/users/favorites_
body: **brak**
response: `[
    {PRODUCT},
    {PRODUCT},
    ...
]`

##### Dodanie do ulubionych:
_PUT: localhost:8080/api/users/favorites?productId_
`productId` - id produktu do dodania
body: **brak** 
response: {PRODUCT}

##### Usunięcie z ulubionych:
_DELETE: localhost:8080/api/users/favorites?productId_
`productId` - id produktu do dodania
body: **brak** 
response: **komunikat**

### KOMENTARZE

**Obiekt komentarza -> COMMENT**
{
	id: int
    content: string
    isVisible: boolean
    isReported: boolean
}

##### Lista komentarzy:
_GET: localhost:8080/api/comments_
body: **brak**
response: `[
    {COMMENT}
    {COMMENT},
    ...
]`

##### Dodaj komentarz:
_POST: localhost:8080/api/comments_

body: {COMMENT}	//oczywiście bez id, nie trzeba B-)

response: {COMMENT}

### admin (funkcje przydatne przy zgłoszeniach):
##### pojedynczy komentarz:
_GET: localhost:8080/api/comments/{commentId}_
`commentId` - id konkretnego komentarza
body: **brak**

response: {COMMENT}

##### **Usuń** pojedynczy komentarz 
_DELETE: localhost:8080/api/comments/{commentId}_
`commentId` - Id komentarza do usunięcia
body: **brak**
response: **komunikat**

### ZGŁOSZENIA
#### private user:
##### zgłoszenie produktu/komentarza:
_POST: localhost:8080/api/reports?productId=&commentId=_

`productId` - id produktu który zgłaszamy
`commentId` - id komentarza który zgłaszamy
Oczywiście na raz podajemy **TYLKO JEDEN** z parametrów

#### admin:

**obiekt zgłoszenia -> REPORT** 
{
	reportId: int
    createdAt: date
    isDone: boolean
    message: string
    authorName: string		// username usera/shopName sellera - którzy zrobili błąd
    reporterName: string
    productId: int		//productId albo commentId - jedno z nich będzie NULLEM!!!
    commentId: int
}

##### lista zgłoszeń
_GET: localhost:8080/api/reports_
body: brak
response: `[
	{REPORT},
    {REPORT},
    ...
]`

##### aktualizowanie zgłoszenia:
_PUT: localhost:8080/api/reports/{reportId}_
`reportId` - id zgłoszenia do zaktualizowania

body: {REPORT}

response: {REPORT}

###### nie przewiduje opcji kasowania zgłoszeń
###### detale pojedynczego zgłoszenia prościej będzie ładować poprzez ściągnięcie odpowiednich danych z backendu
Czyli w momencie zgłoszenia komentarza (commentId ≠ null) front wysyła rządanie o komentarz z danym Id - i wyświetla odpowiednie dane

### POBIERANIE ZDJĘĆ (po image name)
_POST: localhost:8080/api/images_

body: {imageName: string}

response: File (konkretny plik na serwerze ? tablica bajtów - jeszcze nie wiem jak to działa)
