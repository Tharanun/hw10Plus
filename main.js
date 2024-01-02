const userList = document.querySelector('.user-list')

function makeElement(tag, attr_n, attr_v, content){
    let output = document.createElement(tag);
    (!!attr_n) && output.setAttribute(attr_n, attr_v);
    output.textContent = content;
    return output;
}

fetch('https://jsonplaceholder.typicode.com/users')
.then(res => {
    console.log(res)
    return res.json()
})
.then( data => {
    for (let el of data) {
        const li = makeElement('li', 'userId', el.id, `${el.name} / ${el.email}`)
        userList.append(li)
    }
})
.then(()=>{
    document.querySelector('.user-list')
    .addEventListener('click', (e)=>{
        const userId = event.target.getAttribute('userId')
        if(userId){
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                .then(res => res.json())
                .then(posts => {
                    console.log(posts)
                    const postInfo = document.querySelector('.post-info');
                    postInfo.innerHTML = ''; // Clear previous posts
                    posts.forEach(post => {
                        const postItem = document.createElement('div');
                        postItem.classList.add('post-item');
                        postItem.innerHTML = `
                            <h3>${post.id}. ${post.title}</h3>
                            <p>${post.body}</p>
                        `;
                        postInfo.appendChild(postItem);
                    });
                })
                .catch( err => {
                    console.log('Error : ', err)
                })
        }
    })
})