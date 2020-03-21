//-------------------------IMPORT-------------------------//

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');

const uuid = require('uuid');
const uuidv4 = uuid.v4;

const app = express();
app.use(cors({ origin: true }));

//-------------------------INIT-------------------------//

const admin = require('firebase-admin');
const serviceAccount = require('./db_key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://memoframes-c2a63.firebaseio.com',
  storageBucket: 'memoframes-c2a63.appspot.com',
});

const db = admin.database();
const ref = db.ref('postsV1');
const bucket = admin.storage().bucket();

//-------------------------API-CALLS-------------------------//

app.get('*', (req, res) =>
  res.status(200).json({ message: 'MemoFrames API - working' }),
);

app.post('/upload', (req, res) => {
  //Storage token
  const uuid = uuidv4();
  const busboy = new Busboy({ headers: req.headers });
  const tmpdir = os.tmpdir();
  //Form data fields
  const fields = {};
  //Form data files
  const fileWrites = [];

  let uploadImg;

  //------------FIELDS------------//

  busboy.on('field', (fieldname, val) => {
    console.log(`Processed field ${fieldname}: ${val}.`);

    fields[fieldname] = val;
  });

  //------------FILES------------//

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log(`Processed file ${fieldname}: ${file}.`);

    const filepath = path.join(tmpdir, filename);
    upload = { file: filepath, type: mimetype };

    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);

    const promise = new Promise((resolve, reject) => {
      file.on('end', () => {
        writeStream.end();
      });
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
    fileWrites.push(promise);
  });

  //------------FINISH------------//
  busboy.on('finish', async () => {
    await Promise.all(fileWrites);

    bucket.upload(
      upload.file,
      {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: upload.type,
            firebaseStorageDownloadTokens: uuid,
          },
        },
      },
      (err, uploadedFile) => {
        if (!err) {
          const newPostRef = ref
            .child(fields.id)
            .set({
              id: fields.id,
              name: fields.name,
              location: fields.location,
              image:
                'https://firebasestorage.googleapis.com/v0/b/' +
                bucket.name +
                '/o/' +
                encodeURIComponent(uploadedFile.name) +
                '?alt=media&token=' +
                uuid,
            })
            //eslint-disable-next-line promise/always-return
            .then(() => {
              res.status(201).json({ message: 'Post stored' });
            })
            .catch(err => {
              response.status(500).json({ error: err });
            });

          //Second approach
          // const postId = newPostRef.key;
          // await ref.child(postId).update({ postid: postId });
          // console.log(postId);
        } else {
          console.log(err);
        }
      },
    );
  });

  busboy.end(req.rawBody);
});

app.post('/like', (req, res) => {
  const reqPostId = JSON.parse(req.body).id;
  const postRef = ref.child(reqPostId);
  let newLikes, oldLikes;

  postRef
    .child('likes')
    .once('value', snapshot => {
      oldLikes = snapshot.val();
      newLikes = oldLikes + 1;
    })
    .then(() => {
      postRef.update({ likes: newLikes });
      res.status(201).json({ message: 'Liked it!' });
      return 0;
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ message: 'Post not found!' });
    });
});

module.exports.postsFunctions = functions.https.onRequest(app);

//-------------------LEGACY---------------------

// app.post('/like', (req, res) => {
//   const reqPostId = JSON.parse(req.body).id;
//   let POSTID;
//   let LIKES;

//   ref.on('value', async snapshot => {
//     const posts = snapshot.val();

//     for (const postId in posts) {
//       const post = posts[postId];

//       if (post.id === reqPostId) {
//         let newLikes = post.likes || 0;
//         newLikes++;

//         LIKES = newLikes;
//         POSTID = postId;

//         break;
//       }
//     }
//   });

//   setTimeout(() => {
//     admin
//       .database()
//       .ref('postsV1')
//       .child(POSTID)
//       .update({ likes: LIKES });
//   }, 2000);

//   res.status(201).json({ message: 'Liked it!' });
// });
