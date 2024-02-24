'use client';

import React, { useState } from 'react';
import { IonButton, IonInput } from '@ionic/react';
import { supabase } from '@/lib/supabase/client';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fullPathUrl, setFullPathUrl] = useState('');
  const [userId, setUserId] = useState('');
  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user !== null) {
        return user.id;
      } else {
        setUserId('');
        return null;
      }
    } catch (e) {}
  };

  // 파일이 선택되었을 때 호출되는 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('이거 불리면 안됨');

    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    console.log(selectedFile);
    const userId = await getUser();
    if (!userId) return;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`${userId}/avatar46.png`, selectedFile, {
        cacheControl: '3600',
        upsert: true,
      });

    if (data) {
      console.log(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`
      );
      console.log('입니다');

      setFullPathUrl(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`
      );
    } else {
      console.log('잘 안됨...');
      console.log(error);
    }
  };

  const handleProcessVeilImage = () => {
    fetch(`${process.env.NEXT_PUBLIC_ML_SERVER_URL}/generate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://vrmtxkuoitxxnyzbotfn.supabase.co/storage/v1/object/public/images/37ff7abf-9e9c-486e-8cef-1e9e219d1a2f/avatar46.png',
        user: '37ff7abf-9e9c-486e-8cef-1e9e219d1a2f',
      }),
    })
      .then(response => response.json()) // 응답을 JSON으로 변환
      .then(data => {
        setImageUrl(data.imageUrl);
        console.log('잘된듯...?', data);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <IonButton
        color="primary"
        onClick={async () => {
          await uploadFile();
          // handleUploadImage();
        }}
      >
        이미지 업로드하기
      </IonButton>
      <IonInput></IonInput>
      <IonButton color="primary" onClick={handleProcessVeilImage}>
        베일 이미지 생성하기
      </IonButton>
      <p>서버 결과값: {imageUrl}</p>
    </>
  );
};

UploadImage.defaultProps = {};

export default UploadImage;

// const handleUploadImage = async () => {
//
//   // 카메라 옵션 설정
//   const image = await Camera.getPhoto({
//     quality: 90,
//     allowEditing: true,
//     resultType: CameraResultType.Uri,
//     source: CameraSource.Prompt, // 사용자에게 카메라 또는 갤러리 선택을 허용
//   });
//
//   // 이미지 처리 로직 (예: 이미지를 서버로 업로드)
//   console.log('Image URL:', image.webPath);
// };
