<template>
  <div v-if="contact" class="page">
    <h4>Thêm Liên hệ</h4>
    <ContactForm
      :contact="contact"
      @submit:contact="addContact"
      @delete:contact="deleteContact"
    />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
import { boolean } from "yup";
export default {
  components: { ContactForm },
  props: { id: { type: String, required: true } },
  data() {
    return {
      contact: {
        name: "",
        email: "",
        phone: "",
        adress: "",
        favorite:boolean,
      },

      message: "",
    };
  },
  methods: {
    async addContact(data) {
      try {
        await ContactService.create(data);
        this.message = "Liên hệ được thêm thành công.";
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    // this.getContact(this.id);
    console.log("this.contact", this.contact);
    this.message = "";
  },
};
</script>