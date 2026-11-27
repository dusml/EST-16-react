import supabase from "@/supabase/supabase";



export async function getAvatarUrl(userId:string):Promise<string | null>{
  // userId 어떤 유저인지 알아야 하기 때문에 작성을 해줘야 한다. 
  const { data: files, error: listError } = await supabase.storage
  .from('avatars')
  .list("",{
    limit:10,
    search: userId
  })

  if (listError || !files) {
    console.error('파일 목록 불러오기 실패:', listError);
    return null;
  }


  const matchedFile = files.find((file) =>
    file.name.startsWith(userId)
  )

  if (!matchedFile) {
    console.warn(`userId로 시작하는 이미지가 없습니다: ${userId}`);
    return null;
  }

  // console.log(matchedFile.name);
  

  // console.log(userId, files, listError);

  // return null;
  const {data} = supabase.storage
  .from('avatars')
  .getPublicUrl(matchedFile.name)
  
  return data?.publicUrl || null
}



/*
  [추가 정리 - 사용자 아바타 이미지 찾기]

  find()는 배열에서 조건을 만족하는 첫 번째 요소를 반환한다.

  startsWith()는 문자열이 특정 문자열로 시작하는지
  확인하고 true 또는 false를 반환한다.

  파일 목록을 순회하면서 파일 이름이 userId로 시작하는지
  확인하여 현재 사용자의 아바타 파일을 찾는다.

  찾은 파일 객체는 matchedFile에 저장한다.
  조건을 만족하는 파일이 없다면 undefined가 반환된다.
*/


/*
  [추가 정리 - 파일 목록 요청 오류 처리]

  파일 목록을 가져오는 중 오류가 발생하거나
  파일 목록 데이터가 존재하지 않는 경우를 확인한다.

  console.error()를 사용하여 오류 메시지를 출력하고,
  return null을 통해 함수 실행을 종료한다.

  files가 null인 상태에서 find()를 실행하면
  오류가 발생할 수 있으므로 미리 확인하는 것이다.

  이러한 방식을 얼리 리턴(Early Return)이라고 한다.
*/



/*
  [추가 정리 - 아바타 이미지 존재 여부 확인]

  find()는 조건에 맞는 요소를 찾지 못하면
  undefined를 반환한다.

  !matchedFile을 사용하여 일치하는 파일이 없는지 확인한다.

  파일을 찾지 못했다면 console.warn()을 통해
  경고 메시지를 출력한다.

  ${userId}는 템플릿 리터럴 문법으로
  문자열 내부에 사용자 ID 값을 넣는 역할을 한다.
*/