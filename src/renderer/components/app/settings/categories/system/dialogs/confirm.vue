<template>
  <v-dialog
    v-model="visible"
    persistent
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h5">
        ПРЕДУПРЕЖДЕНИЕ
      </v-card-title>
      <v-card-text>

        <p>
          <b>ФУНКЦИОНАЛ СНАПШОТОВ ПРЕДОСТАВЛЯЕТСЯ СТОРОННИМ РАЗРАБОТЧИКОМ И ВСЕ ДАННЫЕ ХРАНЯТСЯ НА СЕРВЕРАХ КОТОРЫЕ
            НЕ ОТНОСЯТСЯ К АНИЛИБРИИ</b>
        </p>
        <p>
          <b>ИСПОЛЬЗОВАНИЕ НА ВАШ СТРАХ И РИСК. ФУНКЦИОНАЛ ПРЕДОСТАВЛЯЕТСЯ БЕЗ КАКИХ ЛИБО ГАРАНТИЙ, РАЗРАБОТЧИК НЕ
            НЕСЕТ
            ОТВЕТСТВЕННОСТЬ ЗА ЛЮБЫЕ ПРЕТЕНЗИИ, ПРИЧЕНЕННЫЙ УЩЕРБ ИЛИ ДРУГОЕ.</b>
        </p>

        <p>
          ИСПОЛЬЗУЯ ФУНКЦИЮ ВЫ СОГЛАШАЕТЕСЬ НА ПЕРЕДАЧУ, ХРАНЕНИЕ, ОБРАБОТКУ ПЕРЕЧИСЛЕННОГО СПИСКА ИНФОРМАЦИИ
          В ЛЮБЫХ ЦЕЛЯХ
        </p>

        <ul>
          <li>Сессионный идентификатор вашего аккаунта, с потенциальным полным доступом к нему (на время его
            действия)
          </li>
          <li>Информацию о просмотрах, настройках плеера, приложения и др</li>
          <li>Прочую информацию которую можно получить в последствии с использованием идентификатора сессии
            (например
            ID, username, списки избранного...)
          </li>
        </ul>

        <p class="mt-1">
          <b>Пароль учетной записи не раскрывается и не передается ни в каком виде</b>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          v-on:click="$emit('openSnapshots')"
        >
          Я согласен
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          v-on:click="visible = false"
        >
          Нет, спасибо
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      loading: false,
    }
  },
  methods: {
    hideDialog () {
      this.visible = false
    },
    /**
     * Show dialog
     *
     * @return void
     */
    showDialog () {
      this.visible = true
    }
  }

}
</script>
