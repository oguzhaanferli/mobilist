
# Contact List Api Example

Kişi bilgileri ve telefon numarası bilgileni kaydedip listeyen bir uygulama.

BackEnd: NodeJS Api
FrontEnd: ReactJS (Api öncelikli çalışıldığı için ön yüze önem verilmedi.)


## Kullanılan Teknolojiler

**İstemci:** React, Bootstrap

**Sunucu:** Node, Express, express-validator, jsonwebtoken, mysql2, sequelize

  
## API Kullanımı

#### Token

```http
  Post /api/gettoken
```

| Parametre     | Tip      | Açıklama                       |
| :--------     | :------- | :-------------------------------- |
| `username`    | `string` | **Gerekli**. Çağrılacak öğenin anahtar değeri |
| `password`    | `string` | **Gerekli**. Çağrılacak öğenin anahtar değeri |


#### Tüm Kullanıcıları getir

```http
  GET /api/users
```

#### Kullanıcı Ekle

```http
  Post /api/users
```

| Parametre     | Tip      | Açıklama                       |
| :--------     | :------- | :-------------------------------- |
| `firstname`    | `string` | **Gerekli**. Çağrılacak öğenin anahtar değeri |
| `lastname`    | `string` | **Gerekli**. Çağrılacak öğenin anahtar değeri |
| `company`    | `string` | **Gerekli**. Çağrılacak öğenin anahtar değeri |
| `phonenumber`    | `array` | **Gerekli**. Çağrılacak öğenin anahtar değeri |


  #### Kullanıcı Güncelle

```http
  PUT /api/users/{id}
```

  #### Kullanıcı Sil

```http
  DELETE /api/users/{id}
```
