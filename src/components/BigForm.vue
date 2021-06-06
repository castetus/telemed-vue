<template>
  <div id="big-form" class="app">
    <div class="stage-markers-wrapper">
      <div class="stage-markers">
        <div class="stage-markers-item"
          :class="{'stage-markers-item_active': key == stage}"
          v-for="(value, key) in stages"
          :key="key">
          <div 
            class="stage-markers-marker" 
            :class="{'stage-markers-marker_active': key == stage}">
            {{key}}
            <span
              class="stage-markers-description"
              :class="{'stage-markers-description_active': key == stage}">
              {{value}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="form-block" v-if="stage < 3">
      <div class="input-block">
        <label for="">Даты действия полиса:</label>
        <div class="datepickers-block">
          <p>С</p>
          <datepicker
            class="datepicker datepicker_from"
            v-model="dateFrom"
            @selected="calculateDateTo"
            :language="ru"
            :disabled-dates="{to: dateFrom}"
            format="dd.MM.yyyy">
          </datepicker>
          <p>По</p>
          <datepicker
            class="datepicker datepicker_to"
            v-model="dateTo"
            :language="ru"
            format="dd.MM.yyyy"
            disabled="disabled">
          </datepicker>
        </div>
      </div>
    </div>
    <form-block
      v-show="stage < 3"
      v-for="(form, key) in forms"
      :key="key"
      :heading="forms[key].heading"
      :mainForm="forms[key].mainForm"
      :showCheckbox="forms[key].showCheckbox"
      :removeButton="forms[key].removeButton"
      :id="key">
    </form-block>
    <div class="data-review" v-if="stage == 2">
      <div class="data-list"
        v-for="form in forms"
        :key="form.id">
        <h5>{{form.heading}}</h5>
        <div class="data-list-item"
          v-for="(value, name) in form.fields"
          :key="name">
          <span class="data-list-item_name">{{labels[name]}}: </span>
          <span class="data-list-item_value">{{preparedData(value)}}  </span>
        </div>
      </div>
    </div>
    <div class="resume-text" v-if="stage == 3">
      <p>После оформления заявки на сайте Вам на почту придет счёт на оплату от страховой компании. После оплаты Вы получите чек и оригинал полиса, который нужно подписать и отправить первую страницу по адресу <a href="mailto:key@med-tele.ru">key@med-tele.ru</a> вместе со сканами (фото) первой страницы паспорта и страницы с пропиской.</p>
      <p>Эти документы нужны для получения доступа к приложению "Доктор Рядом".</p>
      <p>После оплаты доступ начинает действовать через 3 дня сроком на 12 месяцев</p>
    </div>
    <div class="sale-offer">
      <p>Мы снизили цены!<br>
          Стоимость одного полиса теперь всего <span class="text_orange"><b>{{price}}р.</b></span><br></p>
    </div>
    <button
      class="btn btn_green btn_centered"
      v-if="stage !== 3"
      @click="addForm">
      Добавить застрахованного
    </button>
    <div class="calculator">
      <h4 class="heading_green">Стоимость полисов:</h4>
      <div class="calculator__cost">
        <span class="calculator__item"
          v-for="(item, index) of cost"
          :key="index">
          {{item}}р.
          <span v-if="(index < (cost.length - 1))">+</span>
        </span>
        <span v-if="cost.length > 1"> = </span>
        <span class="calculator__sum" v-if="cost.length > 1">{{calculateSum()}}р.</span>
      </div>
    </div>
    <div class="buttons-container">
      <button
        class="btn btn_orange"
        :class="{'btn_disabled' : stage == 1}"
        @click="stageMinus">
        Назад
      </button>
      <button
        class="btn btn_green"
        v-if="stage < 3"
        @click="stagePlus">
        Далее
      </button>
      <button 
        class="btn btn_green"
        v-if="stage == 3"
        @click="sendForm">
        Отправить  
      </button>
    </div>    
    <thank-you v-if="showPopup"></thank-you>
  </div>
</template>

<script>
import {eventBus} from '../main'
import {ru} from 'vuejs-datepicker/dist/locale'
import FormBlock from './Form.vue'
import Datepicker from 'vuejs-datepicker';
// import ThankYouBig from './ThankYouBig.vue'

export default {
  name: 'App',
  components: {
    FormBlock,
    Datepicker,
    // ThankYouBig
  },
  props: {
    price: Number,
  },
  data() {
    return {
      url: window.location.href + '/mailer.php',
      ru: ru,
      forms: [
        {
          heading: 'Страхователь (тот, кто покупает полис)',
          mainForm: true,
          showCheckbox: false,
          fields: {}
        },
        {
          heading: 'Застрахованный 1',
          showCheckbox: true,
          fields: {}
        }
      ],
      stages: {
        1: 'Оформление полиса',
        2: 'Подтверждение данных',
        3: 'Оплата полиса'
      },
      stage: 1,
      double: false,
      labels: {
        surName: 'Фамилия',
        name: 'Имя',
        patrName: 'Отчество',
        birthDate: 'Дата рождения',
        gender: 'Пол',
        country: 'Страна',
        passportNumber: 'Номер паспорта',
        passportDate: 'Дата выдачи паспорта',
        passportEmitter: 'Кем выдан паспорт',
        passportCode: 'Код подразделения',
        placeOfBirth: 'Место рождения',
        customerAddress: 'Адрес регистрации',
      },
      dateFrom: this.calculateDateFrom(),
      dateTo: this.calculateDateTo(this.calculateDateFrom()),
      correctData: true,
      cost: [this.price],
      showPopup: false,
    }
  },
  computed: {

  },
  mounted() {
    eventBus.$on('change', (data) => {
      this.forms[data.id].fields = data.fields
      if (data.phone !== '' && data.email !== ''){
        this.forms[data.id].phone = data.phone
        this.forms[data.id].email = data.email
      }
    })
    eventBus.$on('double', () => {
      this.double = !this.double
    })
    eventBus.$on('removeForm', (id) => {
      this.forms.splice(id, 1)
      this.cost.pop()
    })
    eventBus.$on('validationError', (error) => {
      this.correctData = !error
    })
    this.dateFrom = this.calculateDateFrom()
    this.dateTo = this.calculateDateTo(this.calculateDateFrom())
  },
  methods: {
    preparedData (data){
      if (data instanceof Object){
        let str = ''
        for (let key in data){
          if (key === 'divider'){
            continue
          }
          str = str + data[key] + data.divider
        }
        str = str.substring(0, str.length - 1)
        return str.trim()
      }
      return data
    },
    calculateDateFrom() {
      let currentDate = new Date()
      let startDate = currentDate.getDate() + 3
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), startDate)
    },
    calculateDateTo(startDate) {
      let endDate = startDate.getDate() - 1
      let endYear = startDate.getFullYear() + 1
      this.dateTo = new Date(endYear, startDate.getMonth(), endDate)
      return new Date(endYear, startDate.getMonth(), endDate)
    },
    testFunction(date) {
      this.dateFrom = date
    },
    changeDates(date){
      let endYear = date.getFullYear() + 1
      let endDate = date.getDate() - 1
      this.dateTo = new Date(endYear, date.getMonth(), endDate)
    },
    proceed() {
      eventBus.$emit('proceed', '_')
    },
    calculateSum(){
      return this.cost.reduce((acc, item) => {
        return acc + item
      })
    },
    addForm() {
      if (this.stage !== 1){
        this.stageMinus()
      }
      const newForm = {
        heading: 'Застрахованный ' + this.forms.length,
        showCheckbox: false,
        removeButton: true,
        fields: {}
      }
      this.forms.push(newForm)
      this.cost.push(this.price)
    },
    stagePlus(){
      if (this.stage === 1){
        this.proceed()
      }
      if (this.correctData){
        if (this.stage < 3){
          this.stage++
          eventBus.$emit('changeStage', this.stage)
        }
      }
    },
    stageMinus(){
      if (this.stage > 1){
        this.stage--
        eventBus.$emit('changeStage', this.stage)
      }
    },
    sendForm(){          
      const firstForm = this.forms[0]

      const data = {
        type: 'big',
        content: []
      }

for (let i = 1; i < this.forms.length; i++){
  

const dataItem = 

  {
      "name": "Сделка от " + firstForm.fields.name + " " + firstForm.fields.surName,
      "price": this.calculateSum(),
      "pipeline_id":4171915,
      "_embedded":{
        "contacts":[
            {
              "name": firstForm.fields.name + " " + firstForm.fields.surName,
              "first_name": firstForm.fields.name,
              "last_name": firstForm.fields.surName,
              "custom_fields_values":[
                  {
                    "field_id":829811,
                    "values":[
                        {
                          "value": firstForm.phone,
                        }
                    ]
                  },
                  {
                    "field_id":829813,
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
          "field_id": 907387,
          "field_name": "Дата начала страхования",
          "values": [
              {
                  "value": this.dateFrom.getTime() / 1000
              }
          ]
      },
      {
          "field_id": 844205,
          "field_name": "Пол",
          "values": [
              {
                  "value": this.forms[i].fields.gender
              }
          ]
      },
      {
          "field_id": 912891,
          "field_name": "Дата рождения",
          "values": [
              {
                  "value": this.preparedData(this.forms[i].fields.birthDate)
              }
          ]
      },
      {
          "field_id": 844207,
          "field_name": "Паспорт серия",
          "values": [
              {
                  "value": this.forms[i].fields.passportNumber.serie
              }
          ]
      },
      {
          "field_id": 844209,
          "field_name": "Паспорт номер",
          "values": [
              {
                  "value": this.forms[i].fields.passportNumber.number
              }
          ]
      },
      {
          "field_id": 844211,
          "field_name": "Дата паспорта",
          "values": [
              {
                  "value": this.preparedData(this.forms[i].fields.passportDate)
              }
          ]
      },
      {
          "field_id": 844213,
          "field_name": "Паспорт кем выдан",
          "values": [
              {
                  "value": this.forms[i].fields.passportEmitter
              }
          ]
      },
      {
          "field_id": 844215,
          "field_name": "Код подразделения",
          "values": [
              {
                  "value": this.forms[i].fields.passportCode
              }
          ]
      },
      {
          "field_id": 844217,
          "field_name": "Адрес регистрации",
          "values": [
              {
                  "value": this.forms[i].fields.customerAddress
              }
          ]
      },
      // {
      //     "field_id": 26617,
      //     "field_name": "Страховая компания",
      //     "field_code": null,
      //     "field_type": "select",
      //     "values": [
      //         {
      //             "value": "Ингосстрах",
      //             "enum_id": 12945
      //         }
      //     ]
      // },
      {
          "field_id": 844267,
          "field_name": "Тип страховки",
          "values": [
              {
                  "value": "Телемед",
                  "enum_id": 614969
              }
          ]
      },
      {
          "field_id": 844321,
          "field_name": "Фамилия",
          "values": [
              {
                  "value": this.forms[i].fields.surName
              }
          ]
      },
      {
          "field_id": 844323,
          "field_name": "Имя",
          "values": [
              {
                  "value": this.forms[i].fields.name
              }
          ]
      },
      {
          "field_id": 844325,
          "field_name": "Отчество",
          "values": [
              {
                  "value": this.forms[i].fields.patrName
              }
          ]
      }
      ],
  }

data.content.push(dataItem)
}
eventBus.$emit('sendForm', data)
    }
  }
}
</script>

<style lang="scss">
.big-form{
  &__wrapper{
    width: 100%;
    background: #fff;
    padding: 15px;
    border: 1px solid $color-light-grey;
  }
}
  .app{
    background-color: #fff;
  }
  .form-heading{
    font-size: 19px;
  }
  button{
    margin-top: 30px;
  }
  .buttons-container{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .datepickers-block{
    display: flex;
    align-items: center;
  }
  .datepicker{
    margin: 0 15px 0 5px;
  }
  .stage-markers-wrapper{
    background: #FFFFFF;
    border: 1px solid #C4C4C4;
    box-sizing: border-box;
    padding: 20px 27px;
    height: 117px;
    margin-bottom: 19px;
  }
  .stage-markers{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1px;
    margin: 35px 89px;
    border: 1px solid;
    border-color: transparent;
  }
  .stage-markers-item{
    position: relative;
    background-color: #fff;
    z-index: 4;
    display: none;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    border: 1px solid #C4C4C4;
  }
  .stage-markers-item_active{
    display: flex;
  }
  .stage-markers-marker{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid #C4C4C4;
    width: 42px;
    height: 42px;
    color: #C4C4C4;
    font-size: 18px;
    line-height: 22px;
    font-weight: 600;
  }
  .stage-markers-marker_active{
    background-color: #069E2D;
    color: #fff;
  }
  .stage-markers-description{
    position: absolute;
    bottom: -20px;
    font-size: 13px;
    line-height: 16px;
    font-weight: 600;
    white-space: nowrap;
    color: #C4C4C4;
  }
  .stage-markers-description_active{
    color: #4B4955;
  }
  @media screen and (min-width: 575px) {
    .stage-markers{
      justify-content: space-between;
      border-color: #C4C4C4;
    }
    .stage-markers-item{
      display: flex;
    }
  }
  .resume-text{
    margin-top: 50px;
  }
  .sale-offer{
    border: 4px solid #FF6600;
    padding: 0 10px;
    border-radius: 10px;
    margin: 30px auto;
    font-size: 20px;
  }
  .data-list-item_name{
    font-weight: 700;
  }
  .btn {
  text-align: center;
  letter-spacing: 1px;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  border-radius: 11px;
  text-transform: uppercase;
  display: block;
  width: 256px;
  padding: 17px 0 13px;
  color: #fff;
  cursor: pointer; }
  .btn_outlined {
    color: #4B4955;
    border: 3px solid #4B4955; }
    .btn_outlined:hover {
      background-color: #4B4955;
      color: #fff; }
  .btn_orange {
    background-color: #FF6600;
    border: 3px solid #FF6600; }
    .btn_orange:hover {
      background-color: #fff;
      color: #FF6600; }
  .btn_green {
    background-color: #069E2D;
    border: 3px solid #069E2D; }
    .btn_green:hover {
      background-color: #fff;
      color: #069E2D; }
  .btn_centered {
    margin: 0 auto;}

</style>
