<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
      <v-list dense expand class="mt-3" >
        <template v-for="(item, i) in itemsMenu">
          <v-list-group v-if="item.items" :key="item.name">
            <template v-slot:activator>
              <v-list-item-title class="px-3">
                {{ item.title }}
              </v-list-item-title>
            </template>



            <template v-for="(subItem, i) in item.items">
              <v-list-group sub-group no-action :group="subItem.group" :key="subItem.name" v-if="subItem.items">
                <template v-slot:activator>
                  <v-list-item-title>
                    {{ subItem.title }}
                  </v-list-item-title>
                </template>
                <v-list-item :href="grand.href" :key="i" :to="genChildTarget(item, grand)" v-for="(grand, i) in subItem.items">
                  <v-list-item-content>
                    <v-list-item-title class="px-2">{{ grand.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              
              
              <v-list-item :disabled="subItem.disabled" :key="i" :to="genChildTarget(item, subItem)" v-if="!subItem.items" style="background:#363636 !important">
                <!--v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon-->
                <v-list-item-content>
                  <v-list-item-title class="px-5">{{ subItem.title }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon :class="[subItem.actionClass || 'success--text']">
                    {{ subItem.action }}
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>

          </v-list-group>
          <v-subheader :key="i" v-else-if="item.header">{{
              item.header
            }}
          </v-subheader>

          <v-divider :key="i" v-else-if="item.divider"/>
          <v-list-item
              :disabled="item.disabled"
              :href="item.href"
              :key="item.name"
              :target="item.target"
              :to="!item.href ? { name: item.name } : null"
              v-else
          >
            <v-list-item-icon v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <!--End menu-->

    </v-navigation-drawer>


    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import menu from './menu'

export default {
  data () {
    return {
      itemsMenu: menu,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods:{
     genChildTarget(item, subItem) {
        if (subItem.href) return
        if (subItem.component) {
          return {
            name: subItem.component
          }
        }
        return `/${item.group}/${subItem.name}`
      },
  }
}
</script>
