<script setup lang="ts">
useHead({
  title: 'Politique de Confidentialite | REPAE'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-950 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
          Politique de Confidentialite
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
            1. Introduction
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
            REPAE (Reseau des Professionnels et Anciens Etudiants) s'engage a proteger la vie privee des utilisateurs de son site. Cette politique de confidentialite explique comment nous collectons, utilisons et protegeons vos donnees personnelles.
          </p>
        </section>

        <!-- Section 2 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            2. Donnees collectees
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed mb-4">
            Nous collectons les donnees suivantes :
          </p>
          <ul class="list-disc list-inside text-repae-gray-600 dark:text-repae-gray-400 space-y-2 ml-4">
            <li>Informations d'identification (nom, prenom, email)</li>
            <li>Informations professionnelles (CV, experiences, competences)</li>
            <li>Donnees de navigation (cookies, adresse IP)</li>
            <li>Informations de contact pour les entreprises</li>
          </ul>
        </section>

        <!-- Section 3 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            3. Utilisation des donnees
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed mb-4">
            Vos donnees sont utilisees pour :
          </p>
          <ul class="list-disc list-inside text-repae-gray-600 dark:text-repae-gray-400 space-y-2 ml-4">
            <li>Gerer votre compte et profil utilisateur</li>
            <li>Faciliter la mise en relation avec les entreprises</li>
            <li>Personnaliser votre experience sur le site</li>
            <li>Envoyer des communications relatives aux services</li>
            <li>Ameliorer nos services</li>
          </ul>
        </section>

        <!-- Section 4 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            4. Partage des donnees
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
            Nous ne vendons pas vos donnees personnelles. Elles peuvent etre partagees avec les entreprises partenaires uniquement dans le cadre des services de mise en relation, et avec votre consentement explicite.
          </p>
        </section>

        <!-- Section 5 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            5. Securite des donnees
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
            Nous mettons en oeuvre des mesures de securite techniques et organisationnelles appropriees pour proteger vos donnees personnelles contre tout acces non autorise, modification, divulgation ou destruction.
          </p>
        </section>

        <!-- Section 6 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            6. Vos droits
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed mb-4">
            Conformement a la reglementation en vigueur, vous disposez des droits suivants :
          </p>
          <ul class="list-disc list-inside text-repae-gray-600 dark:text-repae-gray-400 space-y-2 ml-4">
            <li>Droit d'acces a vos donnees</li>
            <li>Droit de rectification</li>
            <li>Droit a l'effacement (droit a l'oubli)</li>
            <li>Droit a la portabilite</li>
            <li>Droit d'opposition au traitement</li>
          </ul>
        </section>

        <!-- Section 7 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            7. Cookies
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
            Notre site utilise des cookies pour ameliorer votre experience de navigation. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalites du site.
          </p>
        </section>

        <!-- Section 8 -->
        <section>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            8. Contact
          </h2>
          <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
            Pour exercer vos droits ou pour toute question concernant notre politique de confidentialite, contactez-nous a : privacy@repae.org
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
