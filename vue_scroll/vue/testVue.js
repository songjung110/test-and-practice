Vue.component( 'test-comp',{
    model: {
        prop: 'text_01'
    },
    props : {
        text_01: String
    },
    template: '<div><input type="text" v-model="val"> 숫자 감지 : {{ val }}</div>',
    data : function() {
        return {
            
        }
    },
    computed: {
        val: {
            get: function(){
                return this.text_01;
            },
            set: function( $val ){
                $val = Number($val) ? Number($val) : "NO";
                this.$emit( 'input', $val );
            }
        },
    },
    mounted : function(){
        console.log( this.val );
    }
})