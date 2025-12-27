
// Vue 3 implementation (mounts to #app)
const { createApp } = Vue;

createApp({
  data() {
    return {
      channels: ['SVT 1', 'SVT 2', 'SVT Barn', 'Kunskapskanalen', 'SVT 24'],
      currentChannel: 'Kunskapskanalen',
      programs: [],
      loading: false,
      menuOpen: false,
      showPrevious: false
    };
  },
  computed: {
    pastPrograms() {
      const now = new Date();
      return this.programs.filter(p => new Date(p.start) < now);
    },
    upcomingPrograms() {
      const now = new Date();
      return this.programs.filter(p => new Date(p.start) >= now).sort((a,b)=>new Date(a.start)-new Date(b.start));
    },
    displayedPrograms() {
      if (this.showPrevious) {
        return this.programs.sort((a,b)=>new Date(a.start)-new Date(b.start));
      }
      return this.upcomingPrograms;
    }
  },
  methods: {
    formatTime(dateStr) {
      const d = new Date(dateStr);
      return d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    setChannel(channelName) {
      this.currentChannel = channelName;
      this.loadChannelData(channelName);
    },
    loadChannelData(channelName) {
      const filePath = `data/${channelName}.json`;
      this.loading = true;
      fetch(filePath)
        .then(res => res.json())
        .then(data => {
          // Ensure programs sorted
          this.programs = data.sort((a,b)=>new Date(a.start)-new Date(b.start));
          this.loading = false;
        })
        .catch(err => {
          console.error('Fel vid laddning av JSON:', err);
          this.programs = [];
          this.loading = false;
        });
    }
  },
  mounted() {
    this.loadChannelData(this.currentChannel);
  }
}).mount('#app');

