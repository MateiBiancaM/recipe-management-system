<script setup>
// Aici definim datele pentru cele 3 carduri.
// Este mai curat să le avem într-o listă decât să copiem codul HTML de 3 ori.
const beneficii = [
  {
    titlu: 'Rețete Nelimitate',
    text: 'Toate ideile culinare într-un singur loc sigur.',
    icon: 'mdi-book-open-page-variant',
    culoare: 'purple'
  },
  {
    titlu: 'Organizare Rapidă',
    text: 'Găsește imediat ce să gătești folosind filtre simple.',
    icon: 'mdi-filter-check',
    culoare: 'deep-purple'
  },
  {
    titlu: 'Gătește Ușor',
    text: 'Urmează pașii și lista de ingrediente.',
    icon: 'mdi-chef-hat',
    culoare: 'indigo'
  }
]
</script>

<template>
  <v-container fluid fill-height class="bg-purple-lighten-5 d-flex align-center justify-center">
    
    <v-container style="max-width: 1200px;">
      
      <div class="text-center mb-10">
        <h1 class="text-h3 font-weight-bold text-purple-darken-3 mb-4">
          Bucătăria ta digitală
        </h1>
        <p class="text-h6 text-grey-darken-1">
          Simplifică modul în care gătești. Tot ce ai nevoie, la un click distanță.
        </p>
      </div>

      <v-row>
        
        <v-col 
          v-for="(item, i) in beneficii" 
          :key="i"
          cols="12" 
          md="4"
        >
          <v-card class="pa-6 text-center rounded-xl" elevation="2" height="100%">
            
            <v-avatar :color="item.culoare" size="80" class="mb-4 text-white">
              <v-icon :icon="item.icon" size="40"></v-icon>
            </v-avatar>

            <h3 class="text-h5 font-weight-bold mb-2">
              {{ item.titlu }}
            </h3>
            
            <p class="text-body-1 text-grey">
              {{ item.text }}
            </p>

          </v-card>
        </v-col>

      </v-row>

    </v-container>
  </v-container>
</template>