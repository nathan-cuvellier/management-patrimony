const app = new Vue({
    el: "#app",
    data: {
        categories: []
    },
    methods: {
        addCategory: function() {
            this.$http.get('/category/add').then(function(response) {
                let id = response.bodyText
                document.querySelector('.categories > div:first-child').insertAdjacentHTML('beforebegin', `
                    <div id="${id}" class="position-relative">
                        <i class="remove-category trash-category las la-2x la-trash cursor-pointer" title="supprimer"></i>
                        <p v-on:key="test" class="edit-category" contenteditable="true">new</p>
                    </div>
                `)
            })

        },

        editCategory: function (event) {
            if(event.target.matches('.edit-category')) {
                let id = event.target.parentNode.getAttribute('id')
                let text = event.target.innerText

                this.$http.post('/category/update/' + id, {
                    'text': text
                }).then((response) => {

                })
            }
        },

        handleRemoveCategory: function(event) {
            if(event.target.matches('.remove-category')) {
                let idCat = event.target.parentNode.getAttribute('id')
                let categories = JSON.parse(JSON.stringify(this.categories))

                this.$http.get('/category/delete/' + idCat).then((response) => {
                    if(typeof response.body === 'object') {
                        let msgError = '<div class="error-popup bg-danger">Erreur, la catégorie est utilisé par les monuments suivants :<br><br><ul>';
                        
                        response.body.forEach((e) => {
                            msgError += '<li>' + e + '</li>'
                        })
                        document.body.insertAdjacentHTML('afterbegin', msgError + '</ul></div>')

                        setTimeout(() => {
                            document.querySelector('.error-popup').remove()
                        }, 5000)
                        return
                    }
                    if(response.bodyText !== 'ok') {
                        alert('Error lors de la suppression')
                        return false
                    }
                    let index = categories.findIndex(x => x.id === parseInt(idCat))
                    
                    event.target.parentNode.remove()
                })
            }

        }
    },
    computed: {},
    mounted: function ()
    {
        this.$http.get('/categories-list').then(function (response)
        {
            this.categories = response.data
        })

        this.$http.get('/layout/head').then(function (response)
        {
            document.querySelector('head').insertAdjacentHTML('afterbegin', response.data)
        })

        this.$http.get('/layout/navbar').then(function (response)
        {
            document.body.insertAdjacentHTML('afterbegin', response.data)
            buildNewBar()
        })

        this.$http.get('/layout/footer').then(function (response)
        {
            document.body.insertAdjacentHTML('beforeend', response.data)
        })

    }
})
