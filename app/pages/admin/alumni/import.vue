<script setup lang="ts">
import type { ImportAlumnisResult } from '~/composables/useIdentityApi'

definePageMeta({
  layout: 'admin',
})

const { importAlumnis } = useIdentityApi()
const toast = useToast()
const router = useRouter()

// Colonnes attendues dans le fichier (cf. backend import-alumnis.handler)
const columns: { name: string; required: boolean; example: string }[] = [
  { name: 'Email', required: true, example: 'jean.kouassi@example.com' },
  { name: 'Prenom', required: true, example: 'Jean' },
  { name: 'Nom', required: true, example: 'Kouassi' },
  { name: 'Annee de promotion', required: true, example: '2018' },
  { name: 'Telephone', required: false, example: '+225 07 00 00 00 00' },
  { name: 'Ville', required: false, example: 'Abidjan' },
  { name: 'Pays de residence', required: false, example: "Cote d'Ivoire" },
  { name: 'Filiere / Departement', required: false, example: 'Reseaux et Telecoms' },
  { name: 'Diplome / Specialite', required: false, example: "Ingenieur en Securite" },
  { name: 'Bio', required: false, example: 'Expert reseaux et cybersecurite' },
]

// State
const file = ref<File | null>(null)
const isDragging = ref(false)
const importing = ref(false)
const result = ref<ImportAlumnisResult | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const acceptedExtensions = ['.xlsx', '.xls', '.csv']

const isValidFile = (f: File) => {
  const lower = f.name.toLowerCase()
  return acceptedExtensions.some((ext) => lower.endsWith(ext))
}

const setFile = (f: File) => {
  if (!isValidFile(f)) {
    toast.error('Format invalide', 'Veuillez sélectionner un fichier Excel (.xlsx, .xls) ou CSV (.csv).')
    return
  }
  file.value = f
  result.value = null
}

const onFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const f = target.files?.[0]
  if (f) setFile(f)
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  const f = e.dataTransfer?.files?.[0]
  if (f) setFile(f)
}

const removeFile = () => {
  file.value = null
  result.value = null
  if (fileInput.value) fileInput.value.value = ''
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

// Telecharger un modele CSV pre-rempli
const downloadTemplate = () => {
  const headers = columns.map((c) => c.name)
  const sample = columns.map((c) => c.example)
  // BOM UTF-8 pour la compatibilite des accents avec Excel
  const csv = '﻿' + [headers.join(','), sample.map((v) => `"${v}"`).join(',')].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'modele-import-alumni.csv'
  a.click()
  URL.revokeObjectURL(url)
}

const submit = async () => {
  if (!file.value) {
    toast.warning('Aucun fichier', 'Veuillez sélectionner un fichier à importer.')
    return
  }
  importing.value = true
  result.value = null
  try {
    const res = await importAlumnis(file.value)
    result.value = res
    if (res.errors.length === 0) {
      toast.success('Import terminé', `${res.success} alumni importé(s) avec succès.`)
    } else if (res.success > 0) {
      toast.warning('Import partiel', `${res.success} importé(s), ${res.errors.length} en erreur.`)
    } else {
      toast.error('Import échoué', `Aucun alumni importé. ${res.errors.length} erreur(s).`)
    }
  } catch (e: any) {
    toast.error('Erreur', e?.data?.message || "Impossible d'importer le fichier.")
  } finally {
    importing.value = false
  }
}

const importAnother = () => {
  removeFile()
}
</script>

<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/admin/alumni"
          class="w-9 h-9 rounded-lg flex items-center justify-center bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer shrink-0"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-left" />
        </NuxtLink>
        <div>
          <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
            Importer des alumni
          </h2>
          <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-1">
            Importez en masse les alumni ayant payé leur droit d'adhésion via un fichier Excel ou CSV.
          </p>
        </div>
      </div>
    </div>

    <!-- Resultat -->
    <div v-if="result" class="space-y-4">
      <!-- Carte recapitulative -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <div
            class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            :class="result.errors.length === 0
              ? 'bg-green-100 dark:bg-green-500/15'
              : result.success > 0
                ? 'bg-orange-100 dark:bg-orange-500/15'
                : 'bg-red-100 dark:bg-red-500/15'"
          >
            <font-awesome-icon
              :icon="result.errors.length === 0 ? 'fa-solid fa-check-circle' : 'fa-solid fa-exclamation-triangle'"
              class="text-2xl"
              :class="result.errors.length === 0
                ? 'text-green-500'
                : result.success > 0 ? 'text-orange-500' : 'text-red-500'"
            />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
              Import terminé
            </h3>
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
              <span class="font-semibold text-green-600 dark:text-green-400">{{ result.success }}</span> alumni importé(s),
              <span class="font-semibold text-red-600 dark:text-red-400">{{ result.errors.length }}</span> erreur(s).
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-700 text-sm font-semibold text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
              @click="importAnother"
            >
              Importer un autre fichier
            </button>
            <button
              class="px-4 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold transition-colors cursor-pointer"
              @click="router.push('/admin/alumni')"
            >
              Voir les alumni
            </button>
          </div>
        </div>
      </div>

      <!-- Table des erreurs -->
      <div
        v-if="result.errors.length > 0"
        class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-gray-200 dark:border-repae-gray-700">
          <h3 class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white">
            Lignes en erreur ({{ result.errors.length }})
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-repae-gray-700">
                <th class="text-left px-6 py-3 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider w-24">
                  Ligne
                </th>
                <th class="text-left px-6 py-3 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider">
                  Erreur
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-repae-gray-700/50">
              <tr v-for="(err, i) in result.errors" :key="i">
                <td class="px-6 py-3">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400">
                    {{ err.row }}
                  </span>
                </td>
                <td class="px-6 py-3 text-sm text-repae-gray-600 dark:text-repae-gray-300">
                  {{ err.error }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Formulaire d'import -->
    <div v-else class="space-y-6">
      <!-- Instructions -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <div class="flex items-start justify-between gap-4 mb-4">
          <div class="flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-circle-info" class="text-violet-500" />
            <h3 class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white">
              Colonnes attendues
            </h3>
          </div>
          <button
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-200 dark:border-violet-500/30 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors cursor-pointer shrink-0"
            @click="downloadTemplate"
          >
            <font-awesome-icon icon="fa-solid fa-download" />
            Modèle CSV
          </button>
        </div>

        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-4">
          La première ligne du fichier doit contenir les en-têtes. Les alumni importés sont automatiquement marqués comme adhérents.
        </p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="col in columns"
            :key="col.name"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            :class="col.required
              ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
              : 'bg-gray-100 text-repae-gray-600 dark:bg-repae-gray-700 dark:text-repae-gray-300'"
          >
            {{ col.name }}
            <span v-if="col.required" class="text-red-500">*</span>
          </span>
        </div>
        <p class="text-xs text-repae-gray-400 dark:text-repae-gray-500 mt-3">
          <span class="text-red-500">*</span> Champs obligatoires.
        </p>
      </div>

      <!-- Zone de depot -->
      <div
        class="relative rounded-2xl border-2 border-dashed transition-colors p-8"
        :class="isDragging
          ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10'
          : 'border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800'"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
      >
        <input
          ref="fileInput"
          type="file"
          accept=".xlsx,.xls,.csv"
          class="hidden"
          @change="onFileSelect"
        />

        <!-- Aucun fichier -->
        <div v-if="!file" class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-cloud-upload-alt" class="text-violet-500 text-2xl" />
          </div>
          <p class="text-sm font-semibold text-repae-gray-900 dark:text-white mb-1">
            Glissez-déposez votre fichier ici
          </p>
          <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-4">
            Formats acceptés : Excel (.xlsx, .xls) ou CSV (.csv)
          </p>
          <button
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold transition-colors cursor-pointer"
            @click="fileInput?.click()"
          >
            <font-awesome-icon icon="fa-solid fa-file-import" />
            Choisir un fichier
          </button>
        </div>

        <!-- Fichier selectionne -->
        <div v-else class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/15 flex items-center justify-center shrink-0">
            <font-awesome-icon
              :icon="file.name.toLowerCase().endsWith('.csv') ? 'fa-solid fa-file-csv' : 'fa-solid fa-file-excel'"
              class="text-green-600 dark:text-green-400 text-xl"
            />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-repae-gray-900 dark:text-white truncate">
              {{ file.name }}
            </p>
            <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
              {{ formatSize(file.size) }}
            </p>
          </div>
          <button
            class="w-9 h-9 rounded-lg flex items-center justify-center text-repae-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer shrink-0"
            @click="removeFile"
          >
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3">
        <NuxtLink
          to="/admin/alumni"
          class="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-700 text-sm font-semibold text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
        >
          Annuler
        </NuxtLink>
        <button
          :disabled="!file || importing"
          class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors cursor-pointer"
          @click="submit"
        >
          <font-awesome-icon
            :icon="importing ? 'fa-solid fa-spinner' : 'fa-solid fa-file-import'"
            :class="{ 'animate-spin': importing }"
          />
          {{ importing ? 'Import en cours...' : 'Lancer l\'import' }}
        </button>
      </div>
    </div>
  </div>
</template>
