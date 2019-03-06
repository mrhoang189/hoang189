<template>
    <section class="container-fluid">
        <h5 class="text-center">List of accounts</h5>
        <AccountComponent :items="listAccount" :fields="getFields"/>
    </section>
</template>

<script type="ts">

    import AccountComponent from '@/components/AccountComponent.vue';
    import {Component,  Vue} from 'vue-property-decorator';

    @Component({
        components: {AccountComponent}
    })

    export default class Home extends Vue {

        get listAccount() {
            return this.$store.getters.LIST_ACCOUNTS;
        }

        get getFields() {
            return ['name', 'password', 'actions']
        }

    }
</script>

<style scoped>

</style>
