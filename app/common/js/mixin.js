import {mapGetters} from 'vuex'

const MINI_HEIGHT = 60+ 'px'

export const playlistMixin = {
    computed: {
        ...mapGetters(['playlist'])
    },    
    mounted() {
        
        this.handlePlaylist(this.playlist, MINI_HEIGHT)
    },
    activated() {

        this.handlePlaylist(this.playlist, MINI_HEIGHT)
    },
    watch: {
        playlist(newval){
            this.handlePlaylist(newval, MINI_HEIGHT)
        }
    },
    methods: {
        handlePlaylist(){
            throw new Error('component must implement handlePlaylist method')
        }
    },


}


