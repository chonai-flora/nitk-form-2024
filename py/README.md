## セットアップ
Firebase Admin SDKの秘密鍵を `credentials.json` として配置します。

```bash
python3 -m venv venv/

source venv/bin/activate

pip3 install -r requirements.txt

python3 init_firestore.py
```

## 集計
```bash
mkdir -p applicants/

# 全集計
python3 save_to_excel.py

# 時間帯を指定して集計
python3 save_to_excel.py --schedule "10:30"
```