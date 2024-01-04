import { api } from "../../scripts/funcs/utils";

const getAndShowComments = async () => {
  // Get Comments
  const courses = (await api.get("courses")).data;
  let comments = [];
  courses.forEach(course => {
    course.comments.forEach(comment => {
      comments.push(comment);
    });
  });
  comments = comments.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  insertComments(comments);
};

const insertComments = comments => {
  const commentsContainer = document.querySelector(".comments__container");

  comments.map((comment, index) => {
    // console.log(comment);
    comment.status == "pending" &&
      commentsContainer.insertAdjacentHTML(
        "beforeend",
        `
          <div
            class="comment w-full bg-gray-100 dark:bg-gray rounded-lg flex items-center flex-col lg:flex-row border border-gray-300 dark:border-slate overflow-hidden">
            <div class="flex flex-col xs:flex-row xs:h-20 lg:h-15 items-center border-b lg:border-none border-gray-200 dark:border-gray-800 basis-full">
              <!-- comment id -->
              <div
                class="h-full w-full xs:w-15 xl:w-20 text-xl border-b xs:border-b-0 xs:border-l border-gray-200 dark:border-gray-800 flex justify-center items-center shrink-0 py-1 xs:py-0 px-1">
                <span class="font-sans mb-1 dark:text-white overflow-hidden"> ${index + 1} </span>
              </div>
              <!-- Comment Body -->
              <div
                class="h-full basis-full border-b xs:border-b-0 xs:border-l border-gray-200 dark:border-gray-800 flex justify-center items-center py-3 xs:py-1 px-4 text-sm overflow-hidden">
                <p class="dark:text-white overflow-hidden line-clamp-5 xs:line-clamp-3 lg:line-clamp-2"> ${comment.body} </p>
              </div>
              <!-- Comment Creator -->
              <div
                class="h-full w-25 xl:w-40 xs:border-l border-gray-200 dark:border-gray-800 flex justify-center items-center shrink-0 p-3 overflow-hidden">
                <span class="dark:text-white font-DanaMedium text-lg overflow-hidden"> ${comment.Users.username} </span>
              </div>
            </div>
            <!-- Comment Actions -->
            <div
              class="h-full self-end lg:self-auto w-52 xl:w-60 border-l border-gray-200 dark:border-gray-800 flex justify-center items-center shrink-0 gap-x-4 lg:gap-x-2 xl:gap-x-4 p-4 lg:p-2 xl:p-2">
              <button class="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition-colors">حذف</button>
              <button class="bg-secondary dark:bg-sky-500 text-white w-full py-2 rounded-lg hover:bg-sky-600 transition-colors">تایید</button>
            </div>
          </div>
    `
      );
  });
};

export default getAndShowComments;