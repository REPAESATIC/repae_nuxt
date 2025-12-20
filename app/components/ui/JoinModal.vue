<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

const options = [
  {
    id: 'it',
    title: 'Je suis un Alumni',
    description: 'Ancien étudiant de l\'ESATIC, rejoignez le réseau professionnel des alumni.',
    icon: 'fa-solid fa-user-graduate',
    href: '/association/adhesion',
    color: 'repae-blue'
  },
  {
    id: 'entreprise',
    title: 'Je suis une Entreprise',
    description: 'Accédez aux talents IT de l\'ESATIC et publiez vos offres d\'emploi.',
    icon: 'fa-solid fa-building',
    href: '/connexion-entreprise',
    color: 'emerald'
  }
]
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <!-- Modal -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="isOpen"
            class="relative w-full max-w-lg bg-white dark:bg-repae-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <!-- Header -->
            <div class="relative px-6 pt-6 pb-4 text-center">
              <button
                @click="closeModal"
                class="absolute top-4 right-4 p-2 rounded-lg text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-200 hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
              >
                <font-awesome-icon icon="fa-solid fa-xmark" class="text-xl" />
              </button>

              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-repae-blue-500/10 dark:bg-repae-blue-500/20 flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-handshake" class="text-3xl text-repae-blue-500" />
              </div>

              <h2 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
                Rejoindre le REPAE
              </h2>
              <p class="mt-2 text-repae-gray-600 dark:text-repae-gray-300 font-brand">
                Choisissez votre profil pour continuer
              </p>
            </div>

            <!-- Options -->
            <div class="px-6 pb-6 space-y-4">
              <NuxtLink
                v-for="option in options"
                :key="option.id"
                :to="option.href"
                @click="closeModal"
                :class="[
                  'block p-5 rounded-xl border-2 transition-all duration-300 group cursor-pointer',
                  option.color === 'repae-blue'
                    ? 'border-repae-blue-200 dark:border-repae-blue-800 hover:border-repae-blue-500 dark:hover:border-repae-blue-500 hover:bg-repae-blue-50 dark:hover:bg-repae-blue-900/20'
                    : 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                ]"
              >
                <div class="flex items-start gap-4">
                  <div
                    :class="[
                      'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                      option.color === 'repae-blue'
                        ? 'bg-repae-blue-500/10 dark:bg-repae-blue-500/20 group-hover:bg-repae-blue-500'
                        : 'bg-emerald-500/10 dark:bg-emerald-500/20 group-hover:bg-emerald-500'
                    ]"
                  >
                    <font-awesome-icon
                      :icon="option.icon"
                      :class="[
                        'text-xl transition-colors',
                        option.color === 'repae-blue'
                          ? 'text-repae-blue-500 group-hover:text-white'
                          : 'text-emerald-500 group-hover:text-white'
                      ]"
                    />
                  </div>
                  <div class="flex-1">
                    <h3
                      :class="[
                        'font-bold font-brand mb-1 transition-colors',
                        option.color === 'repae-blue'
                          ? 'text-repae-gray-900 dark:text-white group-hover:text-repae-blue-600 dark:group-hover:text-repae-blue-400'
                          : 'text-repae-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                      ]"
                    >
                      {{ option.title }}
                    </h3>
                    <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 font-brand">
                      {{ option.description }}
                    </p>
                  </div>
                  <font-awesome-icon
                    icon="fa-solid fa-arrow-right"
                    :class="[
                      'text-lg mt-1 transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0',
                      option.color === 'repae-blue' ? 'text-repae-blue-500' : 'text-emerald-500'
                    ]"
                  />
                </div>
              </NuxtLink>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 bg-gray-50 dark:bg-repae-gray-700/50 text-center">
              <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand">
                Vous avez déjà un compte ?
                <NuxtLink
                  to="/espace-it"
                  @click="closeModal"
                  class="text-repae-blue-500 hover:text-repae-blue-600 font-medium"
                >
                  Connectez-vous
                </NuxtLink>
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
