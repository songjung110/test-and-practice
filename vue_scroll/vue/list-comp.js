var template = ''
+    '<div class="dcp_list_table">'
+    '    <table>'
+    '        <colgroup>'
+    '        <col style="width: 10%">'
+    '        <col style="width: 90%">'
+    '        </colgroup>'
+    '        <thead>'
+    '            <tr>'
+    '                <th>ID</th>'
+    '                <th>content</th>'
+    '            </tr>'
+    '        </thead>'
+    '        <!-- tbody 자체를 main script에서 데이터 받아서 사용 -->'
+    '        <tbody v-if="searchList.length == 10">'
+    '            <tr v-for="( item, index ) in searchList">'
+    '                <td>{{ item.id }}</td>'
+    '                <td>{{ item.content }}</td>'
+    '            </tr>'
+    '        </tbody>'
+    '        <tbody v-else-if="searchList.length == 0">'
+    '            <tr v-for="idx in 4" class="no_data">'
+    '                <td colspan="2"></td>'
+    '            </tr>'
+    '            <tr class="no_data">'
+    '                <td colspan="2">데이터없음</td>'
+    '            </tr>'
+    '            <tr v-for="idx in 5" class="no_data">'
+    '                <td colspan="2"></td>'
+    '            </tr>'
+    '        </tbody>'
+    '        <tbody v-else-if="searchList.length < 10 || searchList.length > 0">'
+    '            <tr v-for="( item, index ) in searchList">'
+    '                <td>{{ item.id }}</td>'
+    '                <td>{{ item.content }}</td>'
+    '            </tr>'
+    '            <tr v-for="idx in (10 - searchList.length) " class="no_data">'
+    '                <td colspan="2"></td>'
+    '            </tr>'
+    '        </tbody>'
+    '    </table>'
+    '</div>'

Vue.component( 'list-comp',{
    template: template,
    props: [ 'value' ],
    data() {
        return {
        }
    },
    computed: {
        searchList: {
            get: function(){
                return this.value;
            },
            set: function( $val ){
                console.log( $val )
            }
        }
    },
    watch: {
        searchList : function( $val ){
            console.log( $val )
        }
    }

})