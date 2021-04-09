const firstForm = this.forms[0]

for (let i = 1; i < this.forms.length; i++){
  const data = []

const dataItem = 
[
  {
      "name": "Сделка от " + firstForm.fields.name + " " + firstForm.fields.surName,
      "price": this.calculateSum(),
      "pipeline_id":4105918,
      "_embedded":{
        "contacts":[
            {
              "name": firstForm.fields.name + " " + firstForm.fields.surName,
              "first_name": firstForm.fields.name,
              "last_name": firstForm.fields.surName,
              "custom_fields_values":[
                  {
                    "field_id":26389,
                    "values":[
                        {
                          "value": firstForm.phone,
                        }
                    ]
                  },
                  {
                    "field_id":26391,
                    "values":[
                        {
                          "value": firstForm.email,
                        }
                    ]
                  }
              ]
            }
        ],
      },
      "custom_fields_values":[
      {
          "field_id": 496403,
          "field_name": "Дата начала страхования",
          "values": [
              {
                  "value": this.dateFrom.getTime() / 1000
              }
          ]
      },
      {
          "field_id": 35221,
          "field_name": "Пол",
          "field_code": "CUSTOMERGENDER",
          "field_type": "textarea",
          "values": [
              {
                  "value": this.forms[i].fields.gender
              }
          ]
      },
      {
          "field_id": 35219,
          "field_name": "Дата рождения",
          "field_code": "DATEOFBIRTH",
          "field_type": "textarea",
          "values": [
              {
                  "value": this.preparedData(this.forms[i].fields.birthDate)
              }
          ]
      },
      {
          "field_id": 35223,
          "field_name": "Паспорт серия",
          "field_code": "PASSPORTSERIE",
          "field_type": "textarea",
          "values": [
              {
                  "value": this.forms[i].fields.passportNumber.serie
              }
          ]
      },
      {
          "field_id": 35225,
          "field_name": "Паспорт номер",
          "field_code": "PASSPORTNUMBER",
          "field_type": "textarea",
          "values": [
              {
                  "value": this.forms[i].fields.passportNumber.number
              }
          ]
      },
      {
          "field_id": 35227,
          "field_name": "Дата паспорта",
          "field_code": "PASSPORTDATE",
          "field_type": "textarea",
          "values": [
              {
                  "value": this.preparedData(this.forms[i].fields.passportDate)
              }
          ]
      },
      {
          "field_id": 35229,
          "field_name": "Паспорт кем выдан",
          "field_code": "PASSPORTWHOISSUED",
          "field_type": "textarea",
          "values": [
              {
                  "value": this.forms[i].fields.passportEmitter
              }
          ]
      },
      {
          "field_id": 35231,
          "field_name": "Код подразделения",
          "field_code": "DIVISIONNUMBER",
          "field_type": "textarea",
          "values": [
              {
                  "value": this.forms[i].fields.passportCode
              }
          ]
      },
      {
          "field_id": 35237,
          "field_name": "Адрес регистрации",
          "field_code": "CUSTOMERADDRESS",
          "field_type": "textarea",
          "values": [
              {
                  "value": this.forms[i].fields.customerAddress
              }
          ]
      },
      {
          "field_id": 26617,
          "field_name": "Страховая компания",
          "field_code": null,
          "field_type": "select",
          "values": [
              {
                  "value": "Ингосстрах",
                  "enum_id": 12945
              }
          ]
      },
      {
          "field_id": 26615,
          "field_name": "Тип страховки",
          "field_code": null,
          "field_type": "select",
          "values": [
              {
                  "value": "Телемед",
                  "enum_id": 12935
              }
          ]
      },
      {
          "field_id": 640869,
          "field_name": "Фамилия",
          "field_code": null,
          "field_type": "text",
          "values": [
              {
                  "value": this.forms[i].fields.surName
              }
          ]
      },
      {
          "field_id": 640871,
          "field_name": "Имя",
          "field_code": null,
          "field_type": "text",
          "values": [
              {
                  "value": this.forms[i].fields.name
              }
          ]
      },
      {
          "field_id": 640873,
          "field_name": "Отчество",
          "field_code": null,
          "field_type": "text",
          "values": [
              {
                  "value": this.forms[i].fields.patrName
              }
          ]
      }
      ],
  },
]
data.push(dataItem)
}