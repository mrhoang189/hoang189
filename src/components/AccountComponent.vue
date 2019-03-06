<template>
    <div>
        <p class="my-4 text-left">
            <b-button variant="success" @click="addAccount" v-b-modal.modal-center size="sm">
                Create an account
            </b-button>
        </p>
        <b-table striped hover :items="items" :fields="fields">
            <template slot="actions" slot-scope="row">
                <b-button v-b-modal.modal-center
                          size="sm"
                          class="mr-2"
                          :class="{'d-none': row.item.name === currentAccount.name}"
                          @click="selectAccount(row.item)">
                    Edit
                </b-button>
                <b-button v-b-modal.modal-center-delete size="sm" class="mr-2" @click="selectAccount(row.item)">
                    Delete
                </b-button>
            </template>
        </b-table>

        <!-- Modal Component Edit -->
        <b-modal id="modal-center" centered title="Account" ref="modal"
                 @ok="handleOk"
                 @shown="onShowModal">
            <b-form @submit="onSubmit" class="needs-validation m-auto"
                    :validated="submitted">
                <label for="username" class="d-flex">Username </label>
                <b-form-input
                        class="mb-2"
                        id="username"
                        label="User name"
                        type="text"
                        v-model="account.name"
                        required
                        placeholder="Enter username"/>
                <label for="password" class="d-flex">Password </label>
                <b-form-input
                        id="password"
                        label="Password"
                        type="password"
                        v-model="account.password"
                        required
                        placeholder="Enter password"/>
            </b-form>
        </b-modal>

        <!-- Modal Component Delete -->
        <b-modal id="modal-center-delete" centered title="Account" ref="modal-delete"
                 @ok="handleDelete"
                 @shown="onShowModal">
            <b-form @submit="onSubmit" class="needs-validation m-auto"
                    :validated="submitted">
                <p>Do you want to delete this account ?</p>
            </b-form>
        </b-modal>

    </div>
</template>

<script type="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class AccountComponent extends Vue {
        @Prop() items;
        @Prop() fields;
        submitted = false;
        account = {};

        get currentAccount() {
            return this.$store.getters.GET_ACCOUNT;
        }

        selectAccount(account) {
            this.$store.dispatch('setAccount', account);
            this.$store.dispatch('setMode', account.name ? true : false);
        };

        addAccount() {
            return this.$store.dispatch('setAccount', {name: '', password: ''});
        }

        onShowModal() {
            this.account = Object.assign({}, this.$store.getters.GET_ACCOUNT);
        };

        handleOk(evt) {
            evt.preventDefault();
            this.submitted = true;
            if (!this.account.name) {
                return true;
            } else {
                this.onSubmit();
            }
        };

        handleDelete(evt) {
            evt.preventDefault();
            this.$store.commit('DELETE_ACCOUNT', this.account);
        }

        onSubmit() {
            this.submitted = false;
            this.$nextTick(() => {
                this.$refs.modal.hide();
            });
            if (!this.$store.getters.GET_MODE) {
                this.$store.commit('ADD_ACCOUNT', this.account);
            } else {
                this.$store.commit('UPDATE_ACCOUNT', this.account);
            }

        }

    }
</script>

<style scoped>

</style>
