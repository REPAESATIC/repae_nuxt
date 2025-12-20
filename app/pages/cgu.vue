<script setup lang="ts">
useHead({
  title: 'Conditions Generales d\'Utilisation | REPAE'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-950 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
          Conditions Generales d'Utilisation
        </h1>
        <p class="text-repae-gray-500 dark:text-repae-gray-400">
          Derniere mise a jour : Janvier 2024
        </p>
      </div>

      <!-- Content -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-8 md:p-12 space-y-8">
        <!-- Section 1 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            1. Objet
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
            Les presentes Conditions Generales d'Utilisation (CGU) ont pour objet de definir les modalites et conditions d'utilisation des services proposes sur le site REPAE (Reseau des Professionnels et Anciens Etudiants), ainsi que de definir les droits et obligations des parties dans ce cadre.
          </p>
        </section>

        <!-- Section 2 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            2. Acceptation des conditions
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
            L'utilisation du site implique l'acceptation pleine et entiere des presentes CGU. Ces conditions sont susceptibles d'etre modifiees ou completees a tout moment, les utilisateurs sont donc invites a les consulter de maniere reguliere.
          </p>
        </section>

        <!-- Section 3 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            3. Services proposes
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed mb-4">
            Le site REPAE propose les services suivants :
          </p>
          <ul class="list-disc list-inside text-repae-gray-600 dark:text-repae-gray-400 space-y-2 ml-4">
            <li>Annuaire des anciens etudiants et professionnels IT</li>
            <li>Publication et consultation d'offres d'emploi et de stages</li>
            <li>Mise en relation entre entreprises et candidats</li>
            <li>Evenements et networking</li>
            <li>Programme de fidelite pour les entreprises partenaires</li>
          </ul>
        </section>

        <!-- Section 4 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            4. Inscription et compte utilisateur
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
            L'acces a certains services necessite une inscription prealable. L'utilisateur s'engage a fournir des informations exactes et a les maintenir a jour. Il est responsable de la confidentialite de ses identifiants de connexion.
          </p>
        </section>

        <!-- Section 5 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            5. Propriete intellectuelle
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
            L'ensemble des elements du site REPAE (textes, images, logos, etc.) sont proteges par le droit de la propriete intellectuelle. Toute reproduction ou representation, totale ou partielle, est interdite sans autorisation prealable.
          </p>
        </section>

        <!-- Section 6 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            6. Responsabilites
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
            REPAE s'efforce d'assurer l'exactitude des informations diffusees mais ne peut garantir leur exhaustivite. L'association ne saurait etre tenue responsable des dommages directs ou indirects resultant de l'utilisation du site.
          </p>
        </section>

        <!-- Section 7 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            7. Contact
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
            Pour toute question relative aux presentes CGU, vous pouvez nous contacter a l'adresse : contact@repae.org
          </p>
        </section>
      </div>

      <!-- Back link -->
      <div class="text-center mt-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-repae-blue-500 hover:text-repae-blue-600 font-medium transition-colors"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-left" />
          Retour a l'accueil
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
