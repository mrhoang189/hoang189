<template>
    <div class="d-flex justify-content-center align-items-center container ">
        <b-button variant="danger" @click="onSubmit">Button</b-button>
        <b-form @submit="onSubmit" class="needs-validation col-4 m-auto"
                :validated="submitted">
            <b-form-group inline
                          id="exampleInputGroup1"
                          label=""
                          label-for="exampleInput1"
                          description="Default user/password: admin/admin"
            >
                <label for="username" class="d-flex">Username</label>
                <b-form-input
                        id="username"
                        label="Email address:"
                        type="text"
                        v-model="username"
                        required
                        placeholder="Enter username"/>
                <label for="password" class="d-flex">Password</label>
                <b-form-input
                        id="password"
                        type="password"
                        v-model="password"
                        required
                        placeholder="Enter password"/>
            </b-form-group>

            <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
    </div>
</template>

<script lang="ts">
    import {Vue} from 'vue-property-decorator';

    export default class Login extends Vue {
        username: string = '';
        password: string = '';
        submitted: boolean = false;
        error = '';

        onSubmit = () => {
            this.submitted = true;
            const currentAccount = this.$store.getters.LIST_ACCOUNTS.filter(item => {
                return item.name === this.username && this.password === item.password
            });
            if (currentAccount.length) {
                this.$router.push('account');
                this.$store.commit('SET_ACCOUNT', {name: this.username, password: this.password});
                this.error = '';
            } else {
                this.error = `The username and password don't exist`;
            }
        }
    };
</script>

<style>
    html, body {
        height: 100%;
    }
</style>
