# Tree Folder
## Nội dung:
* Đọc nội dung một thư mục (direction) kiểm tra toàn bộ thư mục và các thư mục con là in nội dung folder, file có trong thư mục dưới dạng json.
* Trước hết require  đối tượng để làm việc với file
  * *let fs = require('fs')* <br/>*let path = require('path')*  làm việc với đường dẫn thư mục 
* Sử dụng object fs (filesytem) với các phương thức:
  * *fs.readdirSync(path*) (path) --> đường dẫn tuyệt đối thư mục cần đọc: đọc đồng bộ luồng với Sync
  * *fs.readdir:* đọc không đồng bộ với Aync
  * Example: let fileName = '/c/Users/Admin/Desktop/Phuongtrinhbac2/D3Js
'
  * let listItem = fs.statSync(fileName)

* Kiểm tra thư mục là foder hay file in ra json sử dụng phương thức sau:
  * - *fs.statSync(path).isFile()* trả về true nếu là file h false không phải là file.
  * *fs.statSync(path).isDirectory()* trả về true là folder h false không là folder. 

  * path.basename(path) trả về tên thư mục hiện tại như ở ví dụ trả về tên folder D3Js
### Các bước thực hiện
* tạo đối tượng lưu trữ thông tin file: đối tượng có các thuộc tính: name, path, children, type
  *    ```
        let info = {
        path: pathName,
        name: path.basename(pathName)
    } ```
* Kiểm tra folder là thư mục hay file 
  * if là file thì return tên file lưu vào file json 
  *    info.type = 'file'
  * else Tiến hành đọc folder
    info.type = 'folder'    
- Đọc folder cần ghi lưu trong info
  *    info.children = fs.readdirSync(pathName)
- Sử dụng phương thức map() của arr lặp qua từng phẩn tử của folder kiểm tra là file hay foder tương tự như trên nếu là folder sẽ đệ quy lại hàm, file thì trả ra kết quả

       ```
       if(stat(pathName).isDirectory()){
       info.type = 'folder'  
       info.children = fs.readdirSync(pathName)

      .map((file) => {
            if (stat(pathDir + "/" + file).isDirectory) {
           info.type = "folder"
            return this.readDir(pathDir + '/' + file)
          } else {
            info.type = 'file'
          }
         }) 
         }```
