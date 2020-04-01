let registerModal = (() => {

    let modalWrap;
    window.onload = (function(){
        modalWrap = document.querySelector('#modal_wrap');
    });
    
    function _getRegisterModal(props) {
        let html = `
        <div class="modal fade" id="modalRegist" tabindex="-1" role="dialog" aria-labelledby="modalRegistTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">Regist Memories</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ${getRegistForm(props)}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary click closeModal" data-dismiss="modal">닫기</button>
                <button type="button" class="btn btn-primary save">저장</button>
            </div>
            </div>
        </div>
        </div>
        `;

        modalWrap.insertAdjacentHTML('beforeEnd', html);
        $('#modalRegist').modal();
        const modal = document.querySelector('#modalRegist');

        modal.querySelector('.close').addEventListener('click', closeModal);
        modal.querySelector('.closeModal').addEventListener('click', closeModal);
        modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
        modal.querySelector('.save').addEventListener('click', saveModal);
        modal.querySelector('#imgFiles').addEventListener('change', function(e){
            onFileChangeEvent(e.target);
        });
    };

    function getRegistForm(props) {
        let {marker, title} = props;
        let html=`
        <form id="memoriesForm">
            <input type="hidden" id="lat" value="${marker.getPosition().Ga}">
            <input type="hidden" id="lon" value="${marker.getPosition().Ha}">
            <label for="memoriesFormInputTitle">제목</label>
                <div class="form-group input-group">
                <input type="text" class="form-control" id="place" value="${title}">
                <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
            </div>
            <label for="memoriesFormInputMemDate">일자</label>
            <div class="input-group form-group">
                <input type="date" class="form-control" id="memDate">
                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
            </div>
            <label for="memoriesFormTextareaContents">내용</label>
            <div class="form-group">
                <textarea class="form-control" id="memContents" rows="5"></textarea>
            </div>
            <div class="form-group" id="imgPreview">
            </div>
            <label for="memoriesFormInputFile">사진</label>
            <div id="imgFiles">
                <div class="input-group form-group imgUpload">
                    <input type="file" class="form-control">
                    <span class="input-group-addon"><i class="glyphicon glyphicon-file"></i></span>
                </div>
            </div>
        </form>`;
        return html;
    }

    const saveModal = () => {
        loadJSON(function(resp){
            let data = JSON.parse(resp);
            
            let lat = modalWrap.querySelector('#lat');
            let lon = modalWrap.querySelector('#lon');
            let place = modalWrap.querySelector('#place');
            let memDate = modalWrap.querySelector('#memDate');
            let memContents = modalWrap.querySelector('#memContents');
            let key = memDate.value.replace(/-/g,'') + '##' + place.value;
            
            data[key] = {
                'lat': lat.value,
                'lon': lon.value,
                'place': place.value,
                'memDate': memDate.value,
                'memContents': memContents.value
            }
            console.log(JSON.stringify(data));
            closeModal();
            import('./memoryList.js').then(res => {
                let memoryList = new res.default();
            });
        })
    }

    const closeModal = () => {
        modalWrap.firstElementChild.remove();
    }

    const onFileChangeEvent = (that) => {
        let idx;
        let imgFiles = document.querySelector('#imgFiles');
        for(let i=0; i<imgFiles.querySelectorAll('input[type=file]').length; i++){
            if(that === imgFiles.querySelectorAll('input[type=file]')[i]){
                idx = i;
                break;
            }
        }
        let file = that.files[0];
        if(file) {
            if(idx !== imgFiles.querySelectorAll('input[type=file]').length - 1){

            }
            else{
                let blobURL = window.URL.createObjectURL(file);
                modalWrap.querySelector('#imgPreview').insertAdjacentHTML('beforeEnd', `<img src="${blobURL}"alt="" width="80" height="80" >`);
                modalWrap.querySelector('#imgFiles').insertAdjacentHTML('beforeEnd', `
                    <div class="input-group form-group imgUpload">
                        <input type="file" class="form-control">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-file"></i></span>
                    </div>`);
            }
        }
        else {
            imgFiles.querySelectorAll('.imgUpload')[idx].remove();
            modalWrap.querySelector('#imgPreview').querySelectorAll('img')[idx].remove();
        }
    }

    return {
        getRegisterModal: function(props) {
            _getRegisterModal(props);
        }
    }
})();