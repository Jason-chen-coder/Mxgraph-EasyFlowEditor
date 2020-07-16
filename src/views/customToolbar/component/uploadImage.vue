<template>
  <el-dialog
    title="上传本地图片"
    @closed="cancel"
    :visible.sync="uploadImageDialogVisible"
    width="30%"
    center
  >
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      uploadImageDialogVisible: true,
      imageUrl: ""
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {

      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl)
    },
    cancel () {
      this.uploadImageDialogVisible = false
      this.$parent.uploadImageVisible = false;
    },
    confirm () {
      this.uploadImageDialogVisible = false
      this.$parent.uploadImageVisible = false;
      this.$emit("changeNodeImage", this.imageUrl)
    }
  },
  mounted () {
    this.uploadImageDialogVisible = true
  }
}
</script>
<style lang="less">
.avatar-uploader {
  display: flex;
  justify-content: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>