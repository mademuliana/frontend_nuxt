<template>
<v-container class="d-flex justify-center align-center py-md-10 px-md-4 py-4 px-0">
	<v-card
		width="640"
		:outlined="$s.isDesktop"
		:flat="$s.isMobile"
		class="my-md-8 my-0 rounded-lg"
		style="position: relative;"
	>
		<v-card-text class="pa-8">
			<div class="d-none d-md-flex justify-center mb-2">
				<v-img
					src="/assets/images/logo.png"
					max-width="150"
				></v-img>
			</div>
			<p
				class="text-h4 font-weight-bold"
				style="color: #333333"
			>
				{{ $t('auth.login.title.hi') }}, <br />
				{{ $t('auth.login.title.welcome') }}
			</p>
			<div class="mb-4 text-body-1">
				{{ $t('auth.login.label') }}
			</div>

			<v-form ref="form">
        <v-text-field
        	class="mb-6"
            v-model="email"
			outlined
			dense
			hide-details="auto"
            :placeholder="$t('auth.login.email')"
            :rules="isValidate ? rules.emailAddress : []"
        >
			<template v-slot:message="{ message }">
				{{ $t(message) }}
			</template>
        </v-text-field>
        <v-text-field
			class="mb-2"
            v-model="loginBundle.password"
			outlined
			dense
			hide-details="auto"
            :placeholder="$t('auth.login.password')"
            :append-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="showPassword ? 'text' : 'password'"
            :rules="isValidate ? rules.password : []"
            @click:append="showPassword = !showPassword"
        >
			<template v-slot:message="{ message }">
				{{ $t(message) }}
			</template>
		</v-text-field>
			<div class="d-flex align-center">
				<v-checkbox
					class="mt-0"
					hide-details="auto"
				>
                    <template v-slot:label>
                        <span class="text-body-1">
                            {{ $t('auth.login.rememberMe') }}
                        </span>
                    </template>
                </v-checkbox>
                <nuxt-link
                    to="/forgot-password"
                    class="text-decoration-none primary--text ml-auto"
                >
                    <span class="text-body-1">
                        {{ $t('auth.login.forgetPassword') }}
                    </span>
                </nuxt-link>
			</div>
			<div class="mt-8">
				<v-btn
				    block
				    color="primary"
				    class="subtitle-1 font-weight-bold mb-4"
				    height="40"
                    :disabled="isSubmitting"
                    @click="handleLogin"
				>
                    <v-progress-circular
                    v-if="isSubmitting"
                    class="mr-2"
                    indeterminate
                    color="white"
                    :size="18"
                    :width="3"
                    >
                    </v-progress-circular>
					{{ $t('auth.login.ctaLogin') }}
			    </v-btn>
					<nuxt-link
						to="/register"
						class="text-decoration-none"
					>
						<v-btn
							block
							color="primary"
							outlined
							class="subtitle-1 font-weight-bold"
							height="40"
						>
							{{ $t('auth.login.ctaRegister') }}
						</v-btn>
					</nuxt-link>
				</div>
			</v-form>
		</v-card-text>
		<dev-data-dialog :data="loginBundle"></dev-data-dialog>
	</v-card>
</v-container>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';
// import LoginBundle from '@/models/LoginBundle';
import { emailAddress, password } from '@/utils/FormValidationUtil';
import { toastResponse } from '@/utils/DialogUtil';

export default {
	data() {
		return {
      showPassword: false,
		rules: {
			password,
			emailAddress
		},
      isValidate: false,
      isSubmitting: false,
		}
	},
	computed: {
		email: {
			get() {
				// return this.loginBundle.email;
			},
			set(val = '') {
				// this.loginBundle.email = val.toLowerCase();
			}
		}
	},
	methods: {
    ...mapActions({
      login: 'auth2/login'
    }),
	async handleLogin() {
        await this.$auth.loginWith('laravelSanctum', {
            data: {
                username: this.username,
                password: this.password
            }
        })
    }
  },
}
</script>

<style scoped>

</style>