// Composable adaptateur : transforme les reponses API (anglais) vers les types mock (francais)
// Permet aux composants profil de rester inchanges

import type { AlumniItem, WorkExperienceItem, EducationItem, ProjectItem } from './useIdentityApi'
import type { UserProfile } from '@/data/espace-it/user-profile'
import type { Formation } from '@/data/espace-it/formations'
import type { Experience } from '@/data/espace-it/experiences'
import type { Competence, CategorieCompetence, NiveauCompetence } from '@/data/espace-it/competences'
import type { ProjetPortfolio, TypeProjet } from '@/data/espace-it/portfolio'

export function useProfileAdapter() {

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const formatDateYearMonth = (isoDate: string): string => {
    const date = new Date(isoDate)
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    return `${y}-${m}`
  }

  // ─── Alumni -> UserProfile ────────────────────────────────────────────────

  const alumniToUserProfile = (alumni: AlumniItem): UserProfile => {
    return {
      id: alumni.id,
      prenom: alumni.firstName,
      nom: alumni.lastName,
      email: alumni.email || '',
      telephone: alumni.phoneNumber || '',
      photo_url: alumni.photoUrl || '',
      cover_url: alumni.coverPicUrl,
      poste_actuel: '',
      entreprise_actuelle: '',
      promotion: alumni.promotion || 0,
      pays: alumni.country || '',
      ville: alumni.city || '',
      adresse: alumni.address,
      disponibilite: alumni.isOpenToMentoring ? 'ouvert_opportunites' : 'en_poste',
      biographie: alumni.bio || '',
      site_web: alumni.portfolioUrl,
      linkedin_url: alumni.linkedinUrl,
      twitter_url: alumni.xUrl,
      github_url: alumni.githubUrl,
      date_inscription: alumni.createdAt,
      derniere_connexion: alumni.updatedAt,
    }
  }

  // ─── WorkExperience -> Experience ─────────────────────────────────────────

  const contractTypeMap: Record<string, Experience['type_contrat']> = {
    'CDI': 'CDI',
    'CDD': 'CDD',
    'INTERNSHIP': 'Stage',
    'FREELANCE': 'Freelance',
    'PART_TIME': 'CDD',
    'ALTERNATION': 'CDD',
    'VOLUNTEER': 'Consultant',
  }

  const workExperienceToExperience = (exp: WorkExperienceItem): Experience => {
    return {
      id: exp.id,
      poste: exp.position,
      entreprise: exp.companyName,
      logo_url: undefined,
      lieu: exp.location || '',
      type_contrat: contractTypeMap[exp.contractType] || 'CDI',
      date_debut: formatDateYearMonth(exp.startDate),
      date_fin: exp.endDate ? formatDateYearMonth(exp.endDate) : undefined,
      en_cours: !exp.endDate,
      description: exp.description || '',
      competences: undefined,
    }
  }

  // ─── Education -> Formation ───────────────────────────────────────────────

  const educationToFormation = (edu: EducationItem): Formation => {
    return {
      id: edu.id,
      diplome: edu.fieldOfStudy ? `${edu.degree} - ${edu.fieldOfStudy}` : edu.degree,
      etablissement: edu.schoolName,
      lieu: edu.schoolAddress || '',
      date_debut: formatDateYearMonth(edu.startDate),
      date_fin: edu.endDate ? formatDateYearMonth(edu.endDate) : undefined,
      en_cours: !edu.endDate,
      description: edu.description,
      mention: edu.grade,
    }
  }

  // ─── AlumniSkill -> Competence ────────────────────────────────────────────

  const levelMap: Record<string, NiveauCompetence> = {
    'BEGINNER': 'debutant',
    'INTERMEDIATE': 'intermediaire',
    'ADVANCED': 'avance',
    'EXPERT': 'expert',
  }

  const alumniSkillToCompetence = (
    skill: { id: string; name: string; level: string },
  ): Competence => {
    return {
      id: skill.id,
      nom: skill.name,
      categorie: 'autre' as CategorieCompetence,
      niveau: levelMap[skill.level] || 'intermediaire',
      annees_experience: undefined,
      certifie: undefined,
    }
  }

  // ─── Project -> ProjetPortfolio ───────────────────────────────────────────

  const projectToPortfolio = (proj: ProjectItem): ProjetPortfolio => {
    return {
      id: proj.id,
      titre: proj.title,
      description: proj.description,
      image_url: proj.imageUrl || '',
      type: 'web' as TypeProjet,
      technologies: proj.skills?.map(s => s.name) || [],
      url_demo: proj.projectUrl,
      url_github: undefined,
      date_realisation: proj.endDate ? formatDateYearMonth(proj.endDate) : '',
      client: proj.client,
      en_vedette: false,
    }
  }

  // ─── Enrichir profil avec le poste actuel ─────────────────────────────────

  const enrichProfileWithCurrentJob = (
    profile: UserProfile,
    experiences: Experience[],
  ): UserProfile => {
    const currentJob = experiences.find(e => e.en_cours)
    if (currentJob) {
      profile.poste_actuel = currentJob.poste
      profile.entreprise_actuelle = currentJob.entreprise
    }
    return profile
  }

  return {
    alumniToUserProfile,
    workExperienceToExperience,
    educationToFormation,
    alumniSkillToCompetence,
    projectToPortfolio,
    enrichProfileWithCurrentJob,
  }
}
