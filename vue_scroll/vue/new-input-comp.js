var template = ''
+   '<div class="dcp_list_input">'
+   '    <select ref="select" name="searchMode">'
+   '       <option selected="selected">텍스트로 검색</option>'
+   '       <option>번호로 검색</option>'
+   '    </select>'
+   '    <input v-if="selectMode == 0" ref="input_01" type="text" class="new_input" value="텍스트" :placeholder="placeholder">'
+   '    <input v-else-if="selectMode == 1" ref="input_02" type="text" class="new_input" value="넘버" :placeholder="placeholder">'
+   '    <button type="button" @click="keywordConsole" class="new_input_btn">검색</button>'
+   '</div>'

Vue.component( 'new-input-comp',{
    template: template,
    props: [ "searchKey", "value" , "placeholder", "name" ],
    data() {
        return {
            selectMode: 0,
            // searchMode : {
            //     textSearch: true,
            //     numSearch: false
            // },
            inputText : 0
        }
    },
    created: function() {
        
    },
    computed: {
        keyword : {
            get: function(){
                return this.value
            },
            set: function( $val ){
                this.$emit( 'input' , $val );
            }
        },
    },
    watch : {
        "this.$refs.select.selectedIndex" : function( $val ){
            console.log( $val )
        }
    },
    mounted : function(){
        this.selectMode = this.$refs.select.selectedIndex
    },
    methods: {
        keywordConsole : function(){
            this.key = this.$refs.input_01.value;
            this.$emit( "update:searchKey", this.key );
        }
    }
})