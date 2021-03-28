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
                id: 0,
                name: '',
                latitude: '',
                longitude: '',
                category_id: ''
            }

            document.querySelector('form .method').setAttribute('value', 'new')
        },

        newCategoryModal: function() {
            this.initForm()
            let modal = document.querySelector('.modal')

            let form = modal.querySelector('form')

            let method = form.querySelector('.method')

            method.setAttribute('value', 'new')
            this.showCategoryModal()
        },

        showCategoryModal: function() {
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
                    document.querySelector('.places').insertAdjacentHTML('afterbegin', `
                    <div id="${response.bodyText}" data-id="${response.bodyText}" class="position-relative place">
                        <a href="/place/image/${response.bodyText}"><i class="see-images las la-2x la-image cursor-pointer" title="voir les photos"></i></a>
                        <i class="icon-edit-place las la-2x la-pen cursor-pointer" title="editer"></i>
                        <i title="supprimer" class="remove-place trash las la-2x la-trash cursor-pointer"></i>
                        <p class="edit-place">${name}</p>
                    </div>
                    `)

                    modal.classList.add('d-none')
                }).catch(function(err) {
                    console.log(err)
                    let msgError = '<div class="error bg-danger">'
                    if(err.bodyText === 'error-category-not-exist') {
                        msgError += 'Erreur, la catégorie n\'a pas été trouvée';
                    } else {
                        msgError += 'Erreur non identifiée'
                    }

                    form.insertAdjacentHTML('afterbegin', msgError + '</div>')

                })
            } else {
                let idPlace = form.dataset.id
                this.$http.post('/place/update/' + idPlace, {
                    id: idPlace,
                    name: name,
                    latitude: latitude,
                    longitude: longitude,
                    category: category
                }).then(function(response) {
                    document.querySelector('#place-' + idPlace + ' .edit-place').innerText = name
                    modal.classList.add('d-none')
                })
                modal.classList.add('d-none')
            }

        },

        closeModal: function(event) {
            event.preventDefault()

            document.querySelector('.modal')?.classList.add('d-none')
        },

        handlePlace: function(event) {
            if(event.target.matches('.remove-place')) {
                let idPlace = event.target.parentNode.dataset.id

                this.$http.get('/place/delete/' + idPlace).then((response) => {
                    if(response.bodyText !== 'ok') {
                        alert('Error lors de la suppression')
                        return false
                    }

                    event.target.parentNode.remove()
                })
            } else if(event.target.matches('.icon-edit-place')) {
                let idPlace = event.target.parentNode.dataset.id

                this.$http.get('/place/read/' + idPlace).then(function(response) {
                    this.place = response.body
                    let modal = document.querySelector('.modal')

                    let form = modal.querySelector('form')

                    let method = form.querySelector('.method')

                    form.setAttribute('data-id', idPlace)

                    method.setAttribute('value', 'edit')
                    this.showCategoryModal()
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

        this.$http.get('/category/list').then(function (response)
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
