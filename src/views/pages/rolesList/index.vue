<template>
  <div>
    <!-- 面包屑 -->
    <!-- :separator-icon="ArrowRight" -->
    <el-breadcrumb :separator="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <el-button type="primary" @click="dialogFormVisible = true"
        >新建角色</el-button
      >
      <el-table :data="rolesList" style="width: 100%">
        <el-table-column prop="roleName" label="角色名" />
        <el-table-column prop="roleDesc" label="角色描述" />
        <el-table-column>
          <template #default="scope">
            <el-button type="primary" @click="editRow(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="deleteRow(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增+编辑弹层 -->
    <el-dialog
      @close="clearForm"
      v-model="dialogFormVisible"
      :title="formData.id ? '编辑角色' : '新建角色'"
      width="30%"
      draggable
    >
      <el-form ref="userForm" :model="formData" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="formData.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="formData.roleDesc" placeholder="请输入角色描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(userForm)"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from '@vue/reactivity'
import { getRolesApi, addRolesApi, editRolesApi, rolesDeleteApi } from "@/utils/request.js"
import { ElMessage } from 'element-plus'
export default {
  name: "rolesList",
  setup (props) {
    let data = reactive({
      // 角色列表
      rolesList: [],
      dialogFormVisible: false,
      formData: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: {
          required: true, message: "此项必填", trigger: "blur"
        }
      },
    })
    let getList = async () => {
      try {
        let rols = await getRolesApi()
        if (rols.meta.status == 200) {
          ElMessage({
            message: '获取成功',
            type: 'success',
          })
          data.rolesList = rols.data
        } else {
          ElMessage.error(rols.meta.msg)
        }
      } catch (error) {
        ElMessage.error('获取失败')
      }
    }
    let deleteRow = (row) => {
      rolesDeleteApi(row).then(res => {
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        // 稍后处理
        getList()
      })
    }
    const userForm = ref()
    const submitForm = formEl => {
      formEl.validate(res => {
        if (!res) {
          aler
          return
        }
        // 提交表单
        if (data.formData.id) {
          editRolesApi(data.formData).then(res => {
            if (res.data) {
              data.dialogFormVisible = false
              getList()
            }
          })

        } else {
          addRolesApi(data.formData).then(res => {
            if (res.data) {
              data.dialogFormVisible = false
              getList()
            }
          })

        }
      })
    }
    const editRow = row => {
      data.dialogFormVisible = true
      const { roleName, roleDesc, id } = row
      data.formData = {
        id,
        roleName,
        roleDesc
      }
    }
    // 清楚表单
    const clearForm = () => {
      data.formData = {
        roleName: "",
        roleDesc: ""
      }
    }
    getList()
    return {
      ...toRefs(data),
      editRow,
      deleteRow,
      getList,
      userForm,
      submitForm,
      clearForm
    }
  },
};
</script>

<style></style>
