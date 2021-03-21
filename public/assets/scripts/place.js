const app = new Vue({
    el: "#app",
    data: {
        places: [],
        categories: [],
        place: {}
    },
    methods: {
        initForm: function() {
            this.place = {
                name: '',
                latitude: '',
                longitude: '',
                category: ''
            }

            document.querySelector('form .method').setAttribute('value', 'new')
        },

        newCategoryModal: function() {
            let modal = document.querySelector('.modal')

            modal.classList.remove('d-none')


        },

        sendPlace: function(event){
            event.preventDefault()

            let modal = document.querySelector('.modal')

            let form = modal.querySelector('form')

            let method = form.querySelector('.method')
            
            let name = form.querySelector('#name').value
            let latitude = form.querySelector('#latitude').value
            let longitude = form.querySelector('#longitude').value
            let category = form.querySelector('#category').value

            document.querySelector('.error')?.remove()
            if(method.value === 'new') {
                
                this.$http.post('/place/add', {
                    name: name,
                    latitude: latitude,
                    longitude: longitude,
                    category: category
                }).then(function(response) {
                    console.log(response)

                    document.querySelector('.places').insertAdjacentHTML('afterbegin', `
                    <div id="${response.bodyText}" class="position-relative place">
                        <i title="supprimer" class="remove-place trash-place las la-2x la-trash cursor-pointer"></i>
                        <p class="edit-place">${name}</p>
                    </div>
                    `)
                   

                    modal.classList.add('d-none')
                    this.initForm()
                }).catch(function(err) {
                    let msgError = '<div class="error bg-danger">'
                    if(err.bodyText === 'error-category-not-exist') {
                        msgError += 'Erreur, la catégorie n\'a pas été trouvé';
                    } else {
                        msgError += 'Erreur non identifiée'
                    }

                    form.insertAdjacentHTML('afterbegin', msgError + '</div>')
                    return
                })
            } else {
                console.log("edit")
            }

        },
        closeModal: function(event) {
            event.preventDefault()

            document.querySelector('.modal')?.classList.add('d-none')
        },
        handleRemovePlace: function(event) {
            if(event.target.matches('.remove-place')) {
                let idCat = event.target.parentNode.getAttribute('id')

                this.$http.get('/place/delete/' + idCat).then((response) => {
                    if(response.bodyText !== 'ok') {
                        alert('Error lors de la suppression')
                        return false
                    }

                    event.target.parentNode.remove()
                })
            }

        }
    },
    computed: {},
    mounted: function ()
    {
        this.$http.get('/place/list').then(function (response)
        {
            this.places = response.data
        })

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