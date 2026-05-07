// js/i18n.js — All UI translations (FR / EN)
// Exposed as window.translations so both pages can consume it.

window.translations = {
  fr: {
    htmlLang: "fr",
    pageTitle: "Estimateur de cachet - En Piste",
    languageSwitcherAria: "Choix de langue",
    introToggleShow: "Afficher le préambule",
    introToggleHide: "Masquer le préambule",
    heroTitle: "Estimateur de cachet d'artiste de cirque",
    heroIntro: `
      <p>Cet outil a été élaboré à la suite d'un travail de consultation auprès de la communauté circassienne, afin qu'il reflète le plus fidèlement possible les réalités du milieu. Il a été conçu pour vous offrir un point de départ afin d'estimer la valeur de votre travail et fixer un prix cohérent avec votre réalité professionnelle.</p>
      <p>Les données recueillies ont permis d'identifier de grandes catégories structurant la tarification, malgré la diversité des disciplines et des contextes de diffusion. L'outil est donc organisé selon les critères suivants (voir l'onglet légende du tableau Excel pour plus de détails) :</p>
      <ol>
        <li>Le type de diffusion (publique/scénique ou privée/corporative)</li>
        <li>Le type de représentation (une représentation unique, quelques courtes représentations dans une même journée, ou de nombreuses représentations réparties sur l'année)</li>
        <li>Le niveau de dangerosité de la discipline (faible, moyen ou élevé)</li>
        <li>Le niveau d'expérience de l'artiste (0-3 ans, 4-9 ans, 10+ ans)</li>
      </ol>
      <p>Cet outil comporte certaines limites. Il repose sur de grandes catégories et ne peut pas tenir compte de toutes les variables qui influencent un cachet. Il doit donc être utilisé comme un repère et non comme une grille tarifaire fixe. Aussi, les montants proposés doivent être ajustés en fonction de votre région ou territoire, en tenant compte des réalités et des conditions propres au contexte local.</p>
      <p>Des questions complémentaires ont été ajoutées pour vous aider à réfléchir à votre tarification en fonction des particularités de chaque contrat.</p>
      <p>Conçu en 2026, il est recommandé d'ajuster les montants au fil des années en fonction de l'inflation et de l'évolution du marché.</p>
      <p>Nous espérons qu'il contribuera à soutenir une meilleure reconnaissance de la valeur de votre travail.</p>
    `,
    section1Title: "Section 1 - Profil de diffusion",
    section2Title: "Section 2 - Volume de travail",
    chip: {
      inProgress: "En cours",
      completed: "Complétée",
      locked: "Verrouillée",
      open: "Ouverte",
    },
    q1: {
      legend: "1) Quel est le type de diffusion ?",
      labelPublique: "Publique / scénique",
      labelPrivee: "Privée / corporative",
      helpBtnAria: "Aide question 1",
      help: `
        <p><strong>Publique / scénique :</strong> Festival, théâtre, salle de diffusion / spectacle, chapiteau, tournée (chapiteau, théâtre, aréna, etc.), cabaret, souper-spectacle, parc d'amusement, croisière, centre culturel, etc.</p>
        <p><strong>Privée / corporative :</strong> Événement corporatif, animation de rue, soirée privée, mariage, etc.</p>
      `,
    },
    q2: {
      legendDefault: "2) Sélectionnez d'abord le type de diffusion",
      helpBtnAria: "Aide question 2",
      helpDefault:
        "Veuillez d'abord répondre à la question 1 (type de diffusion) pour pouvoir répondre à la question 2.",
      byDiffusion: {
        publique: {
          legend: "2) Quel est le type de représentation ?",
          help: `
            <p><strong>Une représentation :</strong> Une représentation unique, voire une représentation par jour sur plusieurs jours. Ex.: contrat pour un unique spectacle ou un seul numéro.</p>
            <p><strong>Quelques représentations dans une journée :</strong> Quelques courtes représentations dans une même journée. Ex.: performances de 10 à 15 minutes à trois reprises dans la journée.</p>
            <p><strong>De nombreuses représentations dans l'année :</strong> Des représentations avec une fréquence assez élevée qui s'étalent tout au long de l'année. Ex.: contrat avec une compagnie incluant toutes les représentations d'un spectacle au cours de l'année.</p>
          `,
          options: [
            { value: "une-representation", label: "Une représentation" },
            { value: "quelques-representations-journee", label: "Quelques représentations dans une journée" },
            { value: "nombreuses-representations-annee", label: "De nombreuses représentations dans l'année" },
          ],
        },
        privee: {
          legend: "2) Quel est le type de représentation ?",
          help: `
            <p><strong>Une représentation :</strong> Une représentation unique, voire une représentation par jour sur plusieurs jours. Ex.: contrat pour un unique spectacle ou un seul numéro.</p>
            <p><strong>Quelques représentations dans une journée :</strong> Quelques courtes représentations dans une même journée. Ex.: performances de 10 à 15 minutes à trois reprises dans la journée.</p>
            <p><strong>De nombreuses représentations dans l'année :</strong> option non disponible en diffusion privée / corporative.</p>
          `,
          options: [
            { value: "une-representation", label: "Une représentation" },
            { value: "quelques-representations-journee", label: "Quelques représentations dans une journée" },
          ],
        },
      },
    },
    q3: {
      legend: "3) Quelle est la dangerosité de la représentation ?",
      helpBtnAria: "Aide question 3",
      labelFaible: "Faible",
      labelMoyenne: "Moyenne",
      labelElevee: "Élevée",
      help: `
        <p>La classification des disciplines selon leur niveau de dangerosité est indicative. Elle varie selon plusieurs facteurs, notamment la hauteur, la vitesse et la dynamique des mouvements, le potentiel de chute, la charge portée, l'environnement scénique, les conditions techniques, etc. Une même discipline peut donc présenter un niveau de risque différent selon le contexte et la complexité du numéro. La liste offre des repères généraux pour vous aider à situer votre pratique.</p>
        <p><strong>Faible :</strong> Disciplines principalement au sol ou de manipulation d'objets, où le risque demeure généralement limité et contrôlé. Ex.: acro-danse, boule d'équilibre, échelle libre, équilibre, contorsion, monocycle, rola bola, roue allemande, roue cyr, vélo acrobatique, jonglerie, antipodisme, art clownesque, animation.</p>
        <p><strong>Moyenne :</strong> Disciplines impliquant hauteur ou risque modérés, ainsi que des agrès aériens, qu'ils soient statiques ou dynamiques. Les aériens dynamiques sont longés. Ex.: cerceau chinois, mât chinois, main à main, aériens (anneaux, cerceau, cerceau ballant, corde lisse, corde volante, cube, mât pendulaire, sangles, suspension capillaire, tissu, trapèze ballant, trapèze danse, duo trapèze, trapèze fixe).</p>
        <p><strong>Élevée :</strong> Disciplines impliquant grande hauteur et risque élevé, propulsion ou dynamique importante, réception à forte amplitude, comportant un niveau de risque accru. Ex.: banquine, barre russe, jeux icariens, perche, planche coréenne, planche sautoir, trampoline, trampo-mât, balançoire russe, cadre aérien, fil de fer, fil mou.</p>
      `,
    },
    q4: {
      legend: "4) Quel est votre niveau d'expérience ?",
      helpBtnAria: "Aide question 4",
      label0_3: "0-3 ans",
      label4_9: "4-9 ans",
      label10plus: "10+ ans",
      help: "Indiquez votre niveau d'expérience dans votre discipline principale pour situer la fourchette tarifaire.",
    },
    section2: {
      hoursLabel: "Combien d'<strong>heures</strong> de répétitions prévoyez-vous pour l'intégralité du contrat ?",
      daysLabel: "Combien de <strong>journées</strong> de travail avec une/des représentations sont prévues ?",
      hoursPlaceholder: "Ex. : 12",
      daysPlaceholder: "Ex. : 8",
    },
    results: {
      title: "Tarif recommandé",
      hintInitial: "Complétez la section 1 puis la section 2 pour afficher la fourchette estimée.",
      hintInvalidInputs: "Renseignez deux entiers valides pour calculer le tarif recommandé.",
      hintMissingCombo: "Combinaison non définie dans la table de barèmes. Ajoutez-la dans la configuration.",
      hintLive: "Fourchette calculée en direct selon vos réponses.",
      thCategory: "Catégorie",
      thMin: "Borne inférieure",
      thMax: "Borne supérieure",
      rowShowDay: "Tarif pour une journée de représentation",
      rowRepHour: "Tarif pour une heure de répétition",
      rowShowTotal: "Tarif pour l'ensemble des représentations",
      rowRepTotal: "Tarif pour toutes les répétitions",
      rowTotal: "Total",
    },
    validation: {
      required: "Ce champ est requis.",
      integer: "Veuillez entrer un entier positif ou nul.",
    },
    ctaButton: "Créer mon offre de service à partir de cette estimation",
    offer: {
      pageTitle: "Offre de service - En Piste",
      title: "Mon offre de service",
      summaryTitle: "Résumé de l'estimation",
      sliderTitle: "Ajuster mon tarif total",
      sliderHint:
        "Sélectionnez le montant total de votre offre en faisant glisser le curseur entre la borne inférieure et supérieure.",
      selectedFeeLabel: "Tarif sélectionné :",
      premiumSectionTitle: "Primes et justifications",
      premiumSectionHint:
        "Pour chaque point ci-dessous, vous pouvez choisir Oui/Non. Si Oui, des champs optionnels apparaissent pour saisir des détails et, au besoin, une prime à ajouter.",
      yes: "Oui",
      no: "Non",
      adjustmentHelpAria: "Aide",
      adjustmentAppliesQuestion: "Est-ce que cette prime s'applique à votre offre de service ?",
      detailsLabel: "Description",
      primeLabel: "Prime à ajouter",
      selectedShowLabel: "Tarif représentation :",
      selectedRepLabel: "Tarif répétitions :",
      premiumTotalLabel: "Total des primes :",
      compTotalLabel: "Total compensations :",
      finalTotalLabel: "Tarif final pour l'offre :",
      infoTitle: "Informations de l'offre de service",
      offerNumberLabel: "Numéro de l'offre de service",
      offerNumberPlaceholder: "Ex. IT-26-01",
      recipientLabel: "Nom du destinataire",
      recipientPlaceholder: "Ex. Direction artistique / Organisme",
      eventLabel: "Nom de l'événement",
      eventPlaceholder: "Ex. Festival Exemple",
      providerLabel: "Nom de la personne qui fait l'offre",
      providerPlaceholder: "Ex. Prénom Nom",
      projectTitle: "Description du projet",
      projectDescriptionLabel: "Description du projet",
      projectDescriptionPlaceholder: "Décrivez le projet et son contexte.",
      projectTasksTitle: "Tâches du projet",
      projectTasksHint: "Listez les tâches associées au projet pour pouvoir ensuite les attribuer aux personnes.",
      projectAddTaskBtn: "Ajouter une tâche",
      projectTaskCardTitle: "Tâche du projet",
      projectTaskTitleLabel: "Titre de la tâche",
      projectTaskTitlePlaceholder: "Ex. Coordination technique",
      projectTaskDescriptionLabel: "Description de la tâche",
      projectTaskDescriptionPlaceholder: "Ex. Préparer le matériel et coordonner l'installation.",
      projectTaskRemoveBtn: "Supprimer",
      projectTaskEmpty: "Aucune tâche de projet pour le moment.",
      signatureTitle: "Signatures",
      signatureClientLabel: "Signature du client / destinataire",
      signatureArtistLabel: "Signature de l'artiste",
      signatureMeta: "Nom, signature et date",
      pdfBreakdownTitle: "Récapitulatif du calcul",
      pdfInfoTitle: "Informations de l'offre",
      pdfSignatureTitle: "Signatures",
      pdfSignatureClientLabel: "Client / destinataire",
      pdfSignatureArtistLabel: "Artiste",
      pdfProjectTitle: "Projet",
      pdfProjectDescriptionLabel: "Description du projet",
      pdfProjectTasksLabel: "Tâches du projet",
      pdfDetailsTitle: "Détails fournis pour justifier le prix",
      pdfItemCol: "Élément",
      pdfAmountCol: "Montant",
      pdfNoDetails: "Aucun détail saisi.",
      pdfNotProvided: "Non précisé",
      adjustments: {
        formation: {
          title: "Formation et expertise",
          yesNoQuestion: "Quel est votre parcours : autodidacte ou issu d'une formation dans une école de cirque ? Quel est votre niveau de scolarité ? Devez-vous parfaire votre formation pour rester à jour ?",
          detailsLabel: "Si oui, précisez les diplômes et formations"
        },
        value: {
          title: "Valeur artistique et reconnaissance",
          yesNoQuestion: "Votre numéro est-il unique, rare ou exclusif, créé sur mesure ? Produit-il un effet « wow » ? A-t-il reçu des prix ou distinctions ? Êtes-vous un artiste de réputation nationale ou internationale ?"
        },
        contribution: {
          title: "Contribution et format",
          yesNoQuestion: "Quelle est votre contribution complète dans le spectacle ? Avez-vous plusieurs rôles et quelle est leur importance ? S'agit-il d'un solo, d'un duo ou d'un numéro de groupe ? Le numéro est-il plus long que la moyenne ?"
        },
        adaptation: {
          title: "Adaptation et conditions particulières",
          yesNoQuestion: "Devez-vous adapter votre numéro à la demande de l'acheteur ou du diffuseur ? S'agit-il d'un remplacement de dernière minute ? Avez-vous pensé aux conditions du lieu de travail nécessitant plus de logistique et au temps de préparation ? Devez-vous présenter votre numéro à l'extérieur, dans des conditions climatiques extrêmes ?"
        },
        rights: {
          title: "Droits et réutilisation",
          yesNoQuestion: "Avez-vous pris en compte les droits d'auteur, la captation vidéo, la diffusion web ou télé et toute réutilisation future de l'œuvre ?"
        },
        context: {
          title: "Contexte de diffusion",
          yesNoQuestion: "Le numéro est-il présenté dans un événement prestigieux ? Devant un grand public ? En haute ou basse saison ? Le week-end ou en semaine ?"
        }
      },
      generateBtn: "Générer l'offre de service (PDF)",
      backBtn: "Modifier mes réponses",
      noStateMsg: "Aucune estimation trouvée. Redirection vers l'estimateur…",
      breakdownTitle: "Récapitulatif détaillé",
      breakdownRehearsals: "Répétitions",
      breakdownRepresentations: "Représentations",
      breakdownSubtotal: "Sous-total",
      breakdownAdjustments: "Primes et ajustements",
      breakdownTotal: "Total final",
      breakdownHours: "heures",
      breakdownDays: "jours",
      breakdownAt: "à",
      breakdownPerHour: "/h",
      breakdownPerDay: "/j",
      breakdownEquals: "=",
      compensation: {
        title: "Compensations et frais",
        hint: "Ajoutez ici les frais complémentaires (déplacements, logement, repas et autres coûts) qui s'ajoutent à votre offre.",
        workloadTitle: "Équipe et tâches",
        workloadHint: "Ajoutez les personnes du projet, leurs tâches, et le taux horaire appliqué pour chaque tâche.",
        workloadAddPersonBtn: "Ajouter une personne",
        workloadPersonLabel: "Nom de la personne",
        workloadPersonPlaceholder: "Ex. Prénom Nom",
        workloadPersonCardTitle: "Personne",
        workloadRemovePersonBtn: "Supprimer la personne",
        workloadAddTaskBtn: "Ajouter une tâche",
        workloadNoTask: "Aucune tâche pour le moment.",
        workloadTaskTitle: "Tâche",
        workloadRemoveTaskBtn: "Supprimer",
        workloadDegreeLabel: "Diplôme",
        workloadTaskSelectLabel: "Tâche associée",
        workloadTaskSelectPlaceholder: "Sélectionnez une tâche du projet",
        workloadTaskSelectEmpty: "Ajoutez d'abord une tâche dans la section Projet",
        workloadHoursLabel: "Nombre d'heures",
        workloadRateLabel: "Taux horaire",
        workloadRateCurrentLabel: "Taux sélectionné :",
        workloadTaskTotalLabel: "Total de la tâche",
        workloadSectionTotalLabel: "Sous-total équipe et tâches",
        workloadDegreeMaitrise: "Maîtrise",
        workloadDegreePhd: "PhD",
        workloadDegreeOiq: "Membre de l'OIQ",
        pdfWorkloadTitle: "Équipe et tâches",
        pdfWorkloadPersonLabel: "Personne",
        pdfWorkloadTaskLabel: "Tâche",
        pdfWorkloadDegreeLabel: "Diplôme",
        pdfWorkloadHoursLabel: "Heures",
        pdfWorkloadRateLabel: "Taux",
        pdfWorkloadTaskTotalLabel: "Total tâche",
        pdfWorkloadSectionTotalLabel: "Sous-total équipe et tâches",
        resourcesTitle: "Ressources humaines et matérielles",
        resourcesQuestion: "Avez-vous des besoins en ressources, équipements, costumes ou technique dont vous ne disposez pas ?",
        resourcesHelpAria: "Aide ressources humaines et matérielles",
        resourcesHelpText: "Avez-vous besoin d'une personne pour installer votre équipement ou d'un outil particulier ? Même si une personne peut vous aider, ou si un simple tournevis fait l'affaire, précisez-le ici pour que votre client puisse prévoir.",
        resourcesAddMaterialBtn: "Ajouter une ressource matérielle",
        resourcesAddHumanBtn: "Ajouter une ressource humaine",
        resourcesMaterialLabel: "Ressource matérielle",
        resourcesHumanLabel: "Ressource humaine",
        resourcesRemoveBtn: "Supprimer",
        resourcesMaterialClientQuestion: "Le client sera t-il en charge d'apporter cet équipement ?",
        resourcesMaterialReimbQuestion: "Le client remboursera la location ou l'achat par note de frais ?",
        resourcesMaterialAmountQuestion: "Combien voulez vous facturer pour le prendre en charge ?",
        resourcesHumanClientQuestion: "Le client sera t-il en charge de fournir cette ressource humaine ?",
        resourcesHumanReimbQuestion: "Le client remboursera cette ressource humaine par note de frais ?",
        resourcesHumanAmountQuestion: "Combien voulez vous facturer pour la prendre en charge ?",
        adminTitle: "Coûts administratifs et charges",
        adminQuestion: "Avez-vous des coûts administratifs ou de gestion à compenser?",
        adminHelpAria: "Aide coûts administratifs",
        adminHelpText: "Avez-vous inclus le temps de gestion, d'administration, de logistique et de promotion ? Avez-vous des frais liés aux adhésions (UDA, ACT, CNESST, etc.) ou pour des assurances ?",
        amountLabel: "Montant à facturer",
        travelTitle: "Déplacements et lieux",
        transportTitle: "Transport",
        transportQuestion: "Quels modes de transport allez-vous utiliser pour vous rendre à l'événement ?",
        transportLongLabel: "Transport en commun long (avion/train/bus long)",
        transportShortLabel: "Transport en commun court (métro/bus ville)",
        transportTaxiLabel: "Taxi / Uber",
        transportCarLabel: "Voiture personnelle",
        transportMaterialLabel: "Transport de matériel",
        transportLongSubtitle: "Trajet long",
        transportShortSubtitle: "Transport en commun court",
        transportTaxiSubtitle: "Taxi / Uber",
        transportCarSubtitle: "Voiture personnelle",
        transportMaterialSubtitle: "Transport de matériel",
        transportMaterialIntro: "Cette section s'applique si vous ne pouvez pas transporter votre matériel avec vous (par exemple\u00a0: avion cargo). Si vous pouvez prendre votre matériel dans des bagages, ajoutez-les dans la description des autres modes de transport.",
        resourcesTransportNote: "Si vous devez transporter votre matériel, référez-vous à la section Déplacements et lieux.",
        clientCoversQuestion: "Est-ce que le client s'en charge ?",
        reimbFactureQuestion: "Est-ce qu'il rembourse par facture ?",
        reimbNoteQuestion: "Est-ce qu'il rembourse par note de frais ?",
        chargeAmountQuestion: "Combien voulez-vous facturer pour le prendre en charge ?",
        detailsFieldLabel: "Description",
        transportLongDetailsPlaceholder: "Ex.: 2 allers-retours Montreal-Quebec en train",
        transportShortDetailsPlaceholder: "Ex.: 6 trajets de metro entre la gare et le lieu de diffusion",
        transportTaxiDetailsPlaceholder: "Ex.: 4 trajets Uber entre l'hotel, la gare et le site",
        transportMaterialDetailsPlaceholder: "Ex.: envoi cargo séparé de 2 caisses de matériel scénique",
        lodgingDetailsPlaceholder: "Ex.: 3 nuits a Quebec, 2 chambres pour l'equipe",
        carDistanceQuestion: "Nombre estime de km",
        carRateQuestion: "Cout par km (cents/km)",
        carTotalLabel: "Total voiture personnelle",
        lodgingTitle: "Logement",
        lodgingExpensesQuestion: "Est-ce que vous allez avoir des dépenses de logements ?",
        lodgingClientQuestion: "Est-ce que le client s'occupe du logement ?",
        lodgingAmountQuestion: "Quel montant voulez-vous facturer pour le logement ?",
        mealsTitle: "Repas",
        mealsExpensesQuestion: "Est-ce que vous allez avoir des dépenses pour vos repas ?",
        mealsZoneLabel: "Zone des dépenses",
        mealsZoneQc: "Québec",
        mealsZoneBc: "Colombie-Britannique",
        mealsZoneOn: "Ontario",
        mealsColName: "Repas",
        mealsColQty: "Nombre",
        mealsColUnit: "Coût unitaire",
        mealsColTotal: "Total",
        mealBreakfast: "Déjeuner",
        mealLunch: "Dîner",
        mealDinner: "Souper",
        mealsGrandTotalLabel: "TOTAL",
        totalLineLabel: "Total compensations et frais",
        pdfResourcesLabel: "Ressources humaines et matérielles",
        pdfResourcesMaterialLabel: "Ressource matérielle",
        pdfResourcesHumanLabel: "Ressource humaine",
        pdfClientProvidesMaterial: "L'équipement sera apporté par le client.",
        pdfReimbursedMaterial: "La location ou l'achat de cet équipement sera remboursé par le client par note de frais.",
        pdfClientProvidesHuman: "Cette ressource humaine sera fournie par le client.",
        pdfReimbursedHuman: "Cette ressource humaine sera remboursée par le client par note de frais.",
        pdfAdminLabel: "Coûts administratifs et charges",
        pdfTransportLongLabel: "Transport long",
        pdfTransportShortLabel: "Transport court",
        pdfTaxiLabel: "Taxi/Uber",
        pdfCarLabel: "Voiture personnelle",
        pdfLodgingLabel: "Logement",
        pdfMealsLabel: "Repas",
        pdfMealsZoneLabel: "Zone des dépenses",
        pdfConditionsTitle: "Conditions",
        pdfNoConditions: "Aucune condition particuliere.",
        pdfClientCoversTransportLong: "Le transport en commun long est pris en charge par le client.",
        pdfReimbursedTransportLong: "Le transport en commun long sera rembourse par le client sur facture.",
        pdfReimbursedTransportShort: "Le transport en commun court sera rembourse par le client sur facture.",
        pdfTransportMaterialLabel: "Transport de matériel",
        pdfClientCoversTransportMaterial: "Le transport de matériel est pris en charge par le client.",
        pdfReimbursedTransportMaterial: "Le transport de matériel sera rembourse par le client sur facture.",
        pdfReimbursedTaxi: "Les deplacements en taxi/Uber seront rembourses par le client sur facture.",
        pdfClientCoversLodging: "Le logement sera pris en charge par le client.",
        pdfReimbursedLodging: "Le logement sera rembourse par le client par note de frais."
      },
    },
    bonusHtml: `
      <h2>Section bonus - Points de réflexion</h2>
      <p>La fourchette de prix proposée par l'outil ne constitue pas une vérité absolue, mais plutôt un repère indicatif pour vous aider à estimer la valeur de votre travail.</p>
      <p>Les questions ci-dessous visent à vous permettre de mieux situer votre réalité artistique, professionnelle et contextuelle. Elles peuvent également appuyer et justifier un tarif situé en dehors de la plage suggérée, lorsque votre situation le requiert.</p>
      <h3>Formation et expertise</h3>
      <p>Quel est votre parcours : autodidacte ou issu d'une formation dans une école de cirque ? Quel est votre niveau de scolarité ? Devez-vous parfaire votre formation pour rester à jour ?</p>
      <h3>Valeur artistique et reconnaissance</h3>
      <p>Votre numéro est-il unique, rare ou exclusif, créé sur mesure ? Produit-il un effet « wow » ? A-t-il reçu des prix ou distinctions ? Êtes-vous un artiste de réputation nationale ou internationale ?</p>
      <h3>Contribution et format</h3>
      <p>Quelle est votre contribution complète dans le spectacle ? Avez-vous plusieurs rôles et quelle est leur importance ? S'agit-il d'un solo, d'un duo ou d'un numéro de groupe ? Le numéro est-il plus long que la moyenne ?</p>
      <h3>Adaptation et conditions particulières</h3>
      <p>Devez-vous adapter votre numéro à la demande de l'acheteur ou du diffuseur ? S'agit-il d'un remplacement de dernière minute ? Avez-vous pensé aux conditions du lieu de travail nécessitant plus de logistique et au temps de préparation ? Devez-vous présenter votre numéro à l'extérieur, dans des conditions climatiques extrêmes ?</p>
      <h3>Ressources humaines et matérielles</h3>
      <p>Devez-vous engager un.e technicien.ne ? Louer un espace de répétition ? Devez-vous vous procurer des équipements, costumes ou maquillage ? Assumer leur entretien ? Transporter votre équipement ?</p>
      <h3>Droits et réutilisation</h3>
      <p>Avez-vous pris en compte les droits d'auteur, la captation vidéo, la diffusion web ou télé et toute réutilisation future de l'œuvre ?</p>
      <h3>Contexte de diffusion</h3>
      <p>Le numéro est-il présenté dans un événement prestigieux ? Devant un grand public ? En haute ou basse saison ? Le week-end ou en semaine ?</p>
      <h3>Déplacements et lieu</h3>
      <p>Le numéro a-t-il lieu dans une autre ville ? Le coût de la vie y est-il plus élevé que votre budget habituel ? Avez-vous négocié les frais de transport, d'hébergement et de perdiem ?</p>
      <h3>Coûts administratifs et charges</h3>
      <p>Avez-vous inclus le temps de gestion, d'administration, de logistique et de promotion ? Avez-vous des frais liés aux adhésions (UDA, ACT, CNESST, etc.) ou pour des assurances ?</p>
      <h3>Contexte économique</h3>
      <p>Avez-vous pris en considération l'inflation et l'augmentation du coût de la vie ?</p>
    `,
  },

  en: {
    htmlLang: "en",
    pageTitle: "Fee Estimator - En Piste",
    languageSwitcherAria: "Language switcher",
    introToggleShow: "Show preamble",
    introToggleHide: "Hide preamble",
    heroTitle: "Circus Artist Fee Estimator",
    heroIntro: `
      <p>This tool was developed following a consultation process with the circus community so it can reflect field realities as accurately as possible. It was designed to offer a starting point to help you estimate the value of your work and set a fee that is coherent with your professional reality.</p>
      <p>The collected data made it possible to identify broad categories that structure pricing, despite the diversity of disciplines and diffusion contexts. The tool is therefore organized around the following criteria (see the legend tab in the Excel table for more details):</p>
      <ol>
        <li>Diffusion type (public/stage or private/corporate)</li>
        <li>Performance type (one single performance, a few short performances in one day, or many performances spread across the year)</li>
        <li>Discipline risk level (low, medium, or high)</li>
        <li>Artist experience level (0-3 years, 4-9 years, 10+ years)</li>
      </ol>
      <p>This tool has limitations. It relies on broad categories and cannot account for every variable that influences a fee. It should therefore be used as a reference point, not as a fixed rate grid. Amounts should also be adjusted based on your region or territory, taking into account local realities and conditions.</p>
      <p>Additional reflection questions were added to help you think through pricing according to the specific characteristics of each contract.</p>
      <p>Designed in 2026, the amounts should be updated over time to reflect inflation and market changes.</p>
      <p>We hope this tool contributes to better recognition of the value of your work.</p>
    `,
    section1Title: "Section 1 - Performance Profile",
    section2Title: "Section 2 - Work Volume",
    chip: {
      inProgress: "In progress",
      completed: "Completed",
      locked: "Locked",
      open: "Open",
    },
    q1: {
      legend: "1) What is the type of diffusion?",
      labelPublique: "Public / stage",
      labelPrivee: "Private / corporate",
      helpBtnAria: "Question 1 help",
      help: `
        <p><strong>Public / stage:</strong> Festival, theater, performance venue, big top, tour (big top, theater, arena, etc.), cabaret, dinner show, amusement park, cruise, cultural center, etc.</p>
        <p><strong>Private / corporate:</strong> Corporate event, street entertainment, private party, wedding, etc.</p>
      `,
    },
    q2: {
      legendDefault: "2) Select the diffusion type first",
      helpBtnAria: "Question 2 help",
      helpDefault:
        "Please answer question 1 first (diffusion type) before answering question 2.",
      byDiffusion: {
        publique: {
          legend: "2) What is the type of performance?",
          help: `
            <p><strong>One performance:</strong> A single performance, or one performance per day over several days. Example: contract for one show or one act.</p>
            <p><strong>A few performances in one day:</strong> A few short performances in the same day. Example: 10 to 15 minute sets repeated three times in one day.</p>
            <p><strong>Many performances over the year:</strong> Performances with fairly high frequency spread over the year. Example: contract with a company including all performances of one show during the year.</p>
          `,
          options: [
            { value: "une-representation", label: "One performance" },
            { value: "quelques-representations-journee", label: "A few performances in one day" },
            { value: "nombreuses-representations-annee", label: "Many performances over the year" },
          ],
        },
        privee: {
          legend: "2) What is the type of performance?",
          help: `
            <p><strong>One performance:</strong> A single performance, or one performance per day over several days. Example: contract for one show or one act.</p>
            <p><strong>A few performances in one day:</strong> A few short performances in the same day. Example: 10 to 15 minute sets repeated three times in one day.</p>
            <p><strong>Many performances over the year:</strong> not available for private / corporate diffusion.</p>
          `,
          options: [
            { value: "une-representation", label: "One performance" },
            { value: "quelques-representations-journee", label: "A few performances in one day" },
          ],
        },
      },
    },
    q3: {
      legend: "3) What is the risk level of the performance?",
      helpBtnAria: "Question 3 help",
      labelFaible: "Low",
      labelMoyenne: "Medium",
      labelElevee: "High",
      help: `
        <p>The classification of disciplines by risk level is indicative. It varies depending on many factors, including height, speed and movement dynamics, fall potential, supported load, stage environment, technical conditions, and more. The same discipline can therefore present different risk levels depending on context and act complexity. This list provides general reference points to help you position your practice.</p>
        <p><strong>Low:</strong> Disciplines mainly on the ground or object manipulation, where risk generally remains limited and controlled. Examples: acro-dance, balance ball, free ladder, hand balancing, contortion, unicycle, rola bola, German wheel, Cyr wheel, acrobatic bicycle, juggling, antipodism, clowning, hosting/MC.</p>
        <p><strong>Medium:</strong> Disciplines involving moderate height or risk, as well as aerial apparatus, either static or dynamic. Dynamic aerials are on lunge. Examples: Chinese hoop, Chinese pole, hand-to-hand, aerials (rings, hoop, swinging hoop, aerial rope, cloud swing, cube, pendulum pole, straps, hair suspension, silk, swinging trapeze, dance trapeze, duo trapeze, static trapeze).</p>
        <p><strong>High:</strong> Disciplines involving great height and high risk, propulsion or strong dynamics, high-amplitude landings, and increased risk level. Examples: banquine, Russian bar, Icarian games, perch, Korean plank, teeterboard, trampoline, trampoline-pole, Russian swing, aerial frame, tight wire, slack wire.</p>
      `,
    },
    q4: {
      legend: "4) What is your experience level?",
      helpBtnAria: "Question 4 help",
      label0_3: "0-3 years",
      label4_9: "4-9 years",
      label10plus: "10+ years",
      help: "Indicate your experience level in your main discipline to position the recommended fee range.",
    },
    section2: {
      hoursLabel: "How many rehearsal <strong>hours</strong> are planned for the full contract?",
      daysLabel: "How many working <strong>days</strong> with one or more performances are planned?",
      hoursPlaceholder: "e.g. 12",
      daysPlaceholder: "e.g. 8",
    },
    results: {
      title: "Recommended Fee",
      hintInitial: "Complete section 1, then section 2 to display the estimated range.",
      hintInvalidInputs: "Enter two valid non-negative integers to calculate the recommended fee.",
      hintMissingCombo: "Combination not defined in the rate table. Add it in the configuration.",
      hintLive: "Range updated live based on your answers.",
      thCategory: "Category",
      thMin: "Lower bound",
      thMax: "Upper bound",
      rowShowDay: "Rate for one performance day",
      rowRepHour: "Rate for one rehearsal hour",
      rowShowTotal: "Rate for all performances",
      rowRepTotal: "Rate for all rehearsals",
      rowTotal: "Total",
    },
    validation: {
      required: "This field is required.",
      integer: "Please enter a non-negative integer.",
    },
    ctaButton: "Create my service offer from this estimate",
    offer: {
      pageTitle: "Service Offer - En Piste",
      title: "My Service Offer",
      summaryTitle: "Estimate Summary",
      sliderTitle: "Adjust my total fee",
      sliderHint:
        "Select the total amount of your offer by moving the slider between the lower and upper bounds.",
      selectedFeeLabel: "Selected fee:",
      premiumSectionTitle: "Premiums and rationale",
      premiumSectionHint:
        "For each point below, you can choose Yes/No. If Yes, optional fields appear to enter details and, if needed, a premium to add.",
      yes: "Yes",
      no: "No",
      adjustmentHelpAria: "Help",
      adjustmentAppliesQuestion: "Does this premium apply to your service offer?",
      detailsLabel: "Description",
      primeLabel: "Premium to add",
      selectedShowLabel: "Performance fee:",
      selectedRepLabel: "Rehearsal fee:",
      premiumTotalLabel: "Total premiums:",
      compTotalLabel: "Total compensations:",
      finalTotalLabel: "Final service-offer fee:",
      infoTitle: "Service Offer Information",
      offerNumberLabel: "Service offer number",
      offerNumberPlaceholder: "Ex. IT-26-01",
      recipientLabel: "Recipient name",
      recipientPlaceholder: "Ex. Artistic direction / Organization",
      eventLabel: "Event name",
      eventPlaceholder: "Ex. Example Festival",
      providerLabel: "Name of the person making the offer",
      providerPlaceholder: "Ex. Firstname Lastname",
      projectTitle: "Project description",
      projectDescriptionLabel: "Project description",
      projectDescriptionPlaceholder: "Describe the project and its context.",
      projectTasksTitle: "Project tasks",
      projectTasksHint: "List the tasks linked to the project so they can then be assigned to people.",
      projectAddTaskBtn: "Add a task",
      projectTaskCardTitle: "Project task",
      projectTaskTitleLabel: "Task title",
      projectTaskTitlePlaceholder: "Ex. Technical coordination",
      projectTaskDescriptionLabel: "Task description",
      projectTaskDescriptionPlaceholder: "Ex. Prepare equipment and coordinate installation.",
      projectTaskRemoveBtn: "Remove",
      projectTaskEmpty: "No project task yet.",
      signatureTitle: "Signatures",
      signatureClientLabel: "Client / recipient signature",
      signatureArtistLabel: "Artist signature",
      signatureMeta: "Name, signature and date",
      pdfBreakdownTitle: "Price breakdown",
      pdfInfoTitle: "Offer information",
      pdfSignatureTitle: "Signatures",
      pdfSignatureClientLabel: "Client / recipient",
      pdfSignatureArtistLabel: "Artist",
      pdfProjectTitle: "Project",
      pdfProjectDescriptionLabel: "Project description",
      pdfProjectTasksLabel: "Project tasks",
      pdfDetailsTitle: "Details provided to justify pricing",
      pdfItemCol: "Item",
      pdfAmountCol: "Amount",
      pdfNoDetails: "No details provided.",
      pdfNotProvided: "Not provided",
      adjustments: {
        formation: {
          title: "Training and expertise",
          yesNoQuestion: "What is your background: self-taught or trained in a circus school? What is your education level? Do you need ongoing training to stay current?",
          detailsLabel: "If yes, list diplomas and training"
        },
        value: {
          title: "Artistic value and recognition",
          yesNoQuestion: "Is your act unique, rare, or exclusive, and custom-created? Does it deliver a \"wow\" effect? Has it received awards or distinctions? Are you known nationally or internationally?"
        },
        contribution: {
          title: "Contribution and format",
          yesNoQuestion: "What is your full contribution to the show? Do you hold multiple roles and how important are they? Is it a solo, duo, or group act? Is the act longer than average?"
        },
        adaptation: {
          title: "Adaptation and specific conditions",
          yesNoQuestion: "Do you need to adapt your act to buyer or presenter requests? Is this a last-minute replacement? Have you considered venue constraints requiring extra logistics and prep time? Will you perform outdoors in extreme weather?"
        },
        rights: {
          title: "Rights and reuse",
          yesNoQuestion: "Have you accounted for copyright, video capture, web or TV broadcast, and any future reuse of the work?"
        },
        context: {
          title: "Diffusion context",
          yesNoQuestion: "Is the act presented at a prestigious event? In front of a large audience? During high or low season? On weekends or weekdays?"
        }
      },
      generateBtn: "Generate service offer (PDF)",
      backBtn: "Edit my answers",
      noStateMsg: "No estimate found. Redirecting to the estimator…",
      breakdownTitle: "Detailed Summary",
      breakdownRehearsals: "Rehearsals",
      breakdownRepresentations: "Performances",
      breakdownSubtotal: "Subtotal",
      breakdownAdjustments: "Premiums and adjustments",
      breakdownTotal: "Final Total",
      breakdownHours: "hours",
      breakdownDays: "days",
      breakdownAt: "at",
      breakdownPerHour: "/hr",
      breakdownPerDay: "/day",
      breakdownEquals: "=",
      compensation: {
        title: "Compensations and expenses",
        hint: "Add additional costs here (travel, lodging, meals and other costs) to include in your service offer.",
        workloadTitle: "Team and tasks",
        workloadHint: "Add project people, their tasks, and the hourly rate applied to each task.",
        workloadAddPersonBtn: "Add a person",
        workloadPersonLabel: "Person name",
        workloadPersonPlaceholder: "Ex. Firstname Lastname",
        workloadPersonCardTitle: "Person",
        workloadRemovePersonBtn: "Remove person",
        workloadAddTaskBtn: "Add a task",
        workloadNoTask: "No task yet.",
        workloadTaskTitle: "Task",
        workloadRemoveTaskBtn: "Remove",
        workloadDegreeLabel: "Degree",
        workloadTaskSelectLabel: "Linked task",
        workloadTaskSelectPlaceholder: "Select a project task",
        workloadTaskSelectEmpty: "Add a task first in the Project section",
        workloadHoursLabel: "Hours",
        workloadRateLabel: "Hourly rate",
        workloadRateCurrentLabel: "Selected rate:",
        workloadTaskTotalLabel: "Task total",
        workloadSectionTotalLabel: "Team and tasks subtotal",
        workloadDegreeMaitrise: "Master's",
        workloadDegreePhd: "PhD",
        workloadDegreeOiq: "OIQ member",
        pdfWorkloadTitle: "Team and tasks",
        pdfWorkloadPersonLabel: "Person",
        pdfWorkloadTaskLabel: "Task",
        pdfWorkloadDegreeLabel: "Degree",
        pdfWorkloadHoursLabel: "Hours",
        pdfWorkloadRateLabel: "Rate",
        pdfWorkloadTaskTotalLabel: "Task total",
        pdfWorkloadSectionTotalLabel: "Team and tasks subtotal",
        resourcesTitle: "Human and material resources",
        resourcesQuestion: "Do you need resources, equipment, costumes, or technical support that you do not already have?",
        resourcesHelpAria: "Human and material resources help",
        resourcesHelpText: "Do you need someone to help install your equipment, or a specific tool? Even if a non-specialist can help, or if a simple screwdriver is enough, mention it here so your client can plan ahead.",
        resourcesAddMaterialBtn: "Add a material resource",
        resourcesAddHumanBtn: "Add a human resource",
        resourcesMaterialLabel: "Material resource",
        resourcesHumanLabel: "Human resource",
        resourcesRemoveBtn: "Remove",
        resourcesMaterialClientQuestion: "Will the client be responsible for bringing this equipment?",
        resourcesMaterialReimbQuestion: "Will the client reimburse the rental or purchase as an expense claim?",
        resourcesMaterialAmountQuestion: "How much do you want to charge to handle it?",
        resourcesHumanClientQuestion: "Will the client be responsible for providing this human resource?",
        resourcesHumanReimbQuestion: "Will the client reimburse this human resource as an expense claim?",
        resourcesHumanAmountQuestion: "How much do you want to charge to handle it?",
        adminTitle: "Administrative costs and charges",
        adminQuestion: "Do you have administrative or management costs to compensate?",
        adminHelpAria: "Administrative costs help",
        adminHelpText: "Have you included management, administration, logistics, and promotion time? Do you have fees related to memberships (UDA, ACT, CNESST, etc.) or insurance?",
        amountLabel: "Amount to charge",
        travelTitle: "Travel and location",
        transportTitle: "Transport",
        transportQuestion: "Which transport modes will you use to get to the event?",
        transportLongLabel: "Long-distance public transport (plane/train/coach)",
        transportShortLabel: "Local public transport (metro/city bus)",
        transportTaxiLabel: "Taxi / Uber",
        transportCarLabel: "Personal car",
        transportMaterialLabel: "Equipment transport",
        transportLongSubtitle: "Long trip",
        transportShortSubtitle: "Local public transport",
        transportTaxiSubtitle: "Taxi / Uber",
        transportCarSubtitle: "Personal car",
        transportMaterialSubtitle: "Equipment transport",
        transportMaterialIntro: "This section applies if you cannot transport your equipment with you (e.g. cargo plane). If you can take your equipment as checked luggage, add it in the description of other transport modes.",
        resourcesTransportNote: "If you need to transport your equipment, refer to the Travel and location section.",
        clientCoversQuestion: "Is this covered by the client?",
        reimbFactureQuestion: "Will they reimburse with receipts?",
        reimbNoteQuestion: "Will they reimburse as expenses?",
        chargeAmountQuestion: "How much do you want to charge to cover this?",
        detailsFieldLabel: "Description",
        transportLongDetailsPlaceholder: "Ex.: 2 round trips Montreal-Quebec by train",
        transportShortDetailsPlaceholder: "Ex.: 6 metro rides between the station and the venue",
        transportTaxiDetailsPlaceholder: "Ex.: 4 Uber rides between the hotel, station, and venue",
        transportMaterialDetailsPlaceholder: "Ex.: separate cargo shipment of 2 cases of stage equipment",
        lodgingDetailsPlaceholder: "Ex.: 3 nights in Quebec City, 2 rooms for the team",
        carDistanceQuestion: "Estimated number of km",
        carRateQuestion: "Cost per km (cents/km)",
        carTotalLabel: "Personal car total",
        lodgingTitle: "Lodging",
        lodgingExpensesQuestion: "Will you have lodging expenses?",
        lodgingClientQuestion: "Is lodging handled by the client?",
        lodgingAmountQuestion: "What amount do you want to charge for lodging?",
        mealsTitle: "Meals",
        mealsExpensesQuestion: "Will you have meal expenses?",
        mealsZoneLabel: "Expense area",
        mealsZoneQc: "Quebec",
        mealsZoneBc: "British Columbia",
        mealsZoneOn: "Ontario",
        mealsColName: "Meal",
        mealsColQty: "Quantity",
        mealsColUnit: "Unit cost",
        mealsColTotal: "Total",
        mealBreakfast: "Breakfast",
        mealLunch: "Lunch",
        mealDinner: "Dinner",
        mealsGrandTotalLabel: "TOTAL",
        totalLineLabel: "Total compensations and expenses",
        pdfResourcesLabel: "Human and material resources",
        pdfResourcesMaterialLabel: "Material resource",
        pdfResourcesHumanLabel: "Human resource",
        pdfClientProvidesMaterial: "This equipment will be provided by the client.",
        pdfReimbursedMaterial: "The rental or purchase of this equipment will be reimbursed by the client as an expense claim.",
        pdfClientProvidesHuman: "This human resource will be provided by the client.",
        pdfReimbursedHuman: "This human resource will be reimbursed by the client as an expense claim.",
        pdfAdminLabel: "Administrative costs and charges",
        pdfTransportLongLabel: "Long transport",
        pdfTransportShortLabel: "Short transport",
        pdfTaxiLabel: "Taxi/Uber",
        pdfCarLabel: "Personal car",
        pdfLodgingLabel: "Lodging",
        pdfMealsLabel: "Meals",
        pdfMealsZoneLabel: "Expense area",
        pdfConditionsTitle: "Conditions",
        pdfNoConditions: "No special conditions.",
        pdfClientCoversTransportLong: "Long-distance public transportation will be handled by the client.",
        pdfReimbursedTransportLong: "Long-distance public transportation will be reimbursed by the client on receipt.",
        pdfReimbursedTransportShort: "Local public transportation will be reimbursed by the client on receipt.",
        pdfTransportMaterialLabel: "Equipment transport",
        pdfClientCoversTransportMaterial: "Equipment transport will be handled by the client.",
        pdfReimbursedTransportMaterial: "Equipment transport will be reimbursed by the client on receipt.",
        pdfReimbursedTaxi: "Taxi/Uber travel will be reimbursed by the client on receipt.",
        pdfClientCoversLodging: "Lodging will be handled by the client.",
        pdfReimbursedLodging: "Lodging will be reimbursed by the client as an expense claim."
      },
    },
    bonusHtml: `
      <h2>Bonus Section - Reflection Points</h2>
      <p>The range suggested by this tool is not an absolute truth. It is an indicative benchmark to help estimate the value of your work.</p>
      <p>The questions below are meant to help you better position your artistic, professional, and contextual reality. They can also support and justify a fee outside the suggested range when your situation requires it.</p>
      <h3>Training and expertise</h3>
      <p>What is your background: self-taught or trained in a circus school? What is your education level? Do you need ongoing training to stay current?</p>
      <h3>Artistic value and recognition</h3>
      <p>Is your act unique, rare, or exclusive, and custom-created? Does it deliver a "wow" effect? Has it received awards or distinctions? Are you known nationally or internationally?</p>
      <h3>Contribution and format</h3>
      <p>What is your full contribution to the show? Do you hold multiple roles and how important are they? Is it a solo, duo, or group act? Is the act longer than average?</p>
      <h3>Adaptation and specific conditions</h3>
      <p>Do you need to adapt your act to buyer or presenter requests? Is this a last-minute replacement? Have you considered venue constraints requiring extra logistics and prep time? Will you perform outdoors in extreme weather?</p>
      <h3>Human and material resources</h3>
      <p>Do you need to hire a technician? Rent rehearsal space? Buy equipment, costumes, or makeup? Cover maintenance costs? Transport your equipment?</p>
      <h3>Rights and reuse</h3>
      <p>Have you accounted for copyright, video capture, web or TV broadcast, and any future reuse of the work?</p>
      <h3>Diffusion context</h3>
      <p>Is the act presented at a prestigious event? In front of a large audience? During high or low season? On weekends or weekdays?</p>
      <h3>Travel and location</h3>
      <p>Does the act take place in another city? Is the cost of living there higher than your usual budget? Have you negotiated transport, accommodation, and per diem?</p>
      <h3>Administrative costs and charges</h3>
      <p>Have you included management, administration, logistics, and promotion time? Do you have fees related to memberships (UDA, ACT, CNESST, etc.) or insurance?</p>
      <h3>Economic context</h3>
      <p>Have you considered inflation and the rising cost of living?</p>
    `,
  },
};
