PGDMP         8                x            fxonline_v2    12.3    12.3 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    19577    fxonline_v2    DATABASE     �   CREATE DATABASE fxonline_v2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE fxonline_v2;
                postgres    false                       1255    21955 �   fn_add_account_staff(character varying, character varying, boolean, character varying, character varying, character varying, date, character varying, character varying, character varying, character varying, boolean, character varying, integer)    FUNCTION        CREATE FUNCTION public.fn_add_account_staff(p_ho character varying, p_ten character varying, p_gioi_tinh boolean, p_email character varying, p_sdt character varying, p_cmnd character varying, p_ngay_cap date, p_noi_cap character varying, p_dia_chi character varying, p_ten_dang_nhap character varying, p_mat_khau character varying, p_trang_thai_tk boolean, p_ghi_chu character varying, p_ma_nhom_quyen integer, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE
 MA_NV int4;
begin
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	if exists(select from "NhanVien" where "CMND" = p_cmnd) then
		update "NhanVien" set "Ho" = p_ho, "Ten" = p_ten, "GioiTinh" = p_gioi_tinh, "Email" = p_email, "SDT" = p_sdt, "NgayCap" = p_ngay_cap, "NoiCap" = p_noi_cap, "DiaChi" = p_dia_chi, "GhiChu" = 'Thêm nhân viên' where "CMND" = p_cmnd
		returning "NhanVien"."MaNV" into MA_NV;
	
	else
		insert into "NhanVien" ("Ho", "Ten", "GioiTinh", "Email", "SDT", "CMND", "NgayCap", "NoiCap", "DiaChi", "GhiChu")
		values (p_ho, p_ten, p_gioi_tinh, p_email, p_sdt, p_cmnd, p_ngay_cap, p_noi_cap, p_dia_chi, 'Thêm nhân viên')
		returning "NhanVien"."MaNV" into MA_NV;
	end if;
	
	if exists(select from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_ten_dang_nhap) or exists(select from "TaiKhoanNhanVien" where "TenDangNhap" = p_ten_dang_nhap) then
		p_status_code := 400;
		p_status_msg := 'Tên đăng nhập đã tồn tại!';
		
	else
		insert into "TaiKhoanNhanVien" ("TenDangNhap", "MatKhau", "TrangThai", "GhiChu", "MaNV", "MaNhomQuyen")
		values (p_ten_dang_nhap, p_mat_khau, p_trang_thai_tk, p_ghi_chu, MA_NV, p_ma_nhom_quyen);
	end if;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 �  DROP FUNCTION public.fn_add_account_staff(p_ho character varying, p_ten character varying, p_gioi_tinh boolean, p_email character varying, p_sdt character varying, p_cmnd character varying, p_ngay_cap date, p_noi_cap character varying, p_dia_chi character varying, p_ten_dang_nhap character varying, p_mat_khau character varying, p_trang_thai_tk boolean, p_ghi_chu character varying, p_ma_nhom_quyen integer, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    21962 �   fn_add_account_trader(character varying, character varying, boolean, character varying, character varying, character varying, date, character varying, character varying, character varying, character varying, boolean, character varying, integer)    FUNCTION     �  CREATE FUNCTION public.fn_add_account_trader(p_ho character varying, p_ten character varying, p_gioi_tinh boolean, p_email character varying, p_sdt character varying, p_cmnd character varying, p_ngay_cap date, p_noi_cap character varying, p_dia_chi character varying, p_ten_dang_nhap character varying, p_mat_khau character varying, p_trang_thai_tk boolean, p_ghi_chu character varying, p_ma_nhom_quyen integer, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE
 MA_NDT int4;
begin
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	if exists(select from "NhaDauTu" where "CMND" = p_cmnd) then
		update "NhaDauTu" set "Ho" = p_ho, "Ten" = p_ten, "GioiTinh" = p_gioi_tinh, "Email" = p_email, "SDT" = p_sdt, "NgayCap" = p_ngay_cap, "NoiCap" = p_noi_cap, "DiaChi" = p_dia_chi, "GhiChu" = p_ghi_chu where "CMND" = p_cmnd
		returning "NhaDauTu"."MaNDT" into MA_NDT;
	
	else
		insert into "NhaDauTu" ("Ho", "Ten", "GioiTinh", "Email", "SDT", "CMND", "NgayCap", "NoiCap", "DiaChi", "GhiChu")
		values (p_ho, p_ten, p_gioi_tinh, p_email, p_sdt, p_cmnd, p_ngay_cap, p_noi_cap, p_dia_chi, p_ghi_chu)
		returning "NhaDauTu"."MaNDT" into MA_NDT;
	end if;
	
	if exists(select from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_ten_dang_nhap) then
		p_status_code := 400;
		p_status_msg := 'Tên đăng nhập đã tồn tại!';
		
	else
		insert into "TaiKhoanNhaDauTu" ("TenDangNhap", "MatKhau", "TrangThai", "MaNDT", "MaNhomQuyen")
		values (p_ten_dang_nhap, p_mat_khau, p_trang_thai_tk, MA_NDT, p_ma_nhom_quyen);
	end if;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 �  DROP FUNCTION public.fn_add_account_trader(p_ho character varying, p_ten character varying, p_gioi_tinh boolean, p_email character varying, p_sdt character varying, p_cmnd character varying, p_ngay_cap date, p_noi_cap character varying, p_dia_chi character varying, p_ten_dang_nhap character varying, p_mat_khau character varying, p_trang_thai_tk boolean, p_ghi_chu character varying, p_ma_nhom_quyen integer, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    21942 ;   fn_add_group(character varying, boolean, character varying)    FUNCTION     3  CREATE FUNCTION public.fn_add_group(p_ten_nhom_quyen character varying, p_trang_thai_nhom_quyen boolean, p_ghi_chu character varying, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
declare
  	MA_NHỌM_QUYEN int4;
begin
	p_status_code := 200;
	p_status_msg := 'OK';
	
	if exists(select from "NhomQuyen" where "TenNhomQuyen" = p_ten_nhom_quyen) then 
		p_status_code := 400;
		p_status_msg := 'Nhóm quyền đã tồn tại!';
		
	else 
		insert into "NhomQuyen"("TenNhomQuyen", "TrangThai", "GhiChu")
		values(p_ten_nhom_quyen, p_trang_thai_nhom_quyen, p_ghi_chu) returning "NhomQuyen"."MaNhomQuyen" into MA_NHỌM_QUYEN;
	end if;

	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_add_group(p_ten_nhom_quyen character varying, p_trang_thai_nhom_quyen boolean, p_ghi_chu character varying, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    21920 e   fn_add_offer(character varying, integer, real, character varying, integer, integer, integer, integer)    FUNCTION     N  CREATE FUNCTION public.fn_add_offer(p_ten_dang_nhap character varying, p_khoi_luong integer, p_gia real, p_ghi_chu character varying, p_ma_tkgd integer, p_ma_ty_gia integer, p_ma_loai_lenh integer, p_ma_trang_thai_lenh integer, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE
	MA_TK_NGUOI_DAT int4;
	TRANG_THAI_CHO_KHOP int4 := 1;
	TRANG_THAI_DA_KHOP int4 := 2;
	MA_LENH int4;
	TONG_TIEN_CAC_LENH_CHO_KHOP int4;
	TONG_KHOI_LUONG int4;
	MA_LOAI_LENH_BAN int4 := 1;
	MA_LOAI_LENH_MUA int4 := 2;
begin
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	select SUM("KhoiLuong" * "Gia") as "TongTien" into TONG_TIEN_CAC_LENH_CHO_KHOP
	from "Lenh"
	where "MaTKGD" = p_ma_tkgd and "MaTrangThaiLenh" = TRANG_THAI_CHO_KHOP
	GROUP BY "MaTKGD";
	
	select sum("KhoiLuong") into TONG_KHOI_LUONG
	from "SoHuu"
	where "MaTyGia" = p_ma_ty_gia and "MaTKNDT" = (select "MaTKNDT" from "TaiKhoanGiaoDich" where "MaTKGD" = p_ma_tkgd)
	group by "MaTyGia", "MaTKNDT";
	
	if (p_ma_loai_lenh = MA_LOAI_LENH_MUA and (select "SoDu" from "TaiKhoanGiaoDich" where "MaTKGD" = p_ma_tkgd) < coalesce(TONG_TIEN_CAC_LENH_CHO_KHOP, 0) + p_gia*p_khoi_luong) then
		p_status_code := 400;
		p_status_msg := 'Vượt quá số dư có trong tài khoản!';
	
	elsif (p_ma_loai_lenh = MA_LOAI_LENH_BAN and coalesce(TONG_KHOI_LUONG, 0) < p_khoi_luong) then
		p_status_code := 400;
		p_status_msg := 'Vượt quá khối lượng có trong tài khoản!';
		
	else
		if exists(select from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_ten_dang_nhap and "TrangThai" = true) then
			select "MaTKNDT" into MA_TK_NGUOI_DAT from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_ten_dang_nhap;
			
			insert into "Lenh"("KhoiLuong", "Gia", "GhiChu", "MaTKNDTDat", "MaTKGD", "MaTyGia", "MaLoaiLenh", "MaTrangThaiLenh")
			values(p_khoi_luong, p_gia, p_ghi_chu, MA_TK_NGUOI_DAT, p_ma_tkgd, p_ma_ty_gia, p_ma_loai_lenh, p_ma_trang_thai_lenh)
			returning "Lenh"."MaLenh" into MA_LENH;
			
			insert into "LS_Lenh"("KhoiLuong", "Gia", "GhiChu", "MaTKNDTThucHien", "MaTKGD", "MaTyGia", "MaLoaiLenh", "MaTrangThaiLenh", "MaLenh") 
			values(p_khoi_luong, p_gia, 'Nhà đầu tư thêm lệnh', MA_TK_NGUOI_DAT, p_ma_tkgd, p_ma_ty_gia, p_ma_loai_lenh, p_ma_trang_thai_lenh, MA_LENH);
		
		elsif exists(select from "TaiKhoanNhanVien" where "TenDangNhap" = p_ten_dang_nhap and "TrangThai" = true) then
			select "MaTKNV" into MA_TK_NGUOI_DAT from "TaiKhoanNhanVien" where "TenDangNhap" = p_ten_dang_nhap;
			
			if p_ma_trang_thai_lenh = TRANG_THAI_DA_KHOP then
				insert into "Lenh"("KhoiLuong", "Gia", "ThoiGianKhopLenh", "GhiChu", "MaTKNVDat", "MaTKNVKhop", "MaTKGD", "MaTyGia", "MaLoaiLenh", "MaTrangThaiLenh")
				values(p_khoi_luong, p_gia, timezone('utc'::text, now()), p_ghi_chu, MA_TK_NGUOI_DAT, MA_TK_NGUOI_DAT, p_ma_tkgd, p_ma_ty_gia, p_ma_loai_lenh, p_ma_trang_thai_lenh)
				returning "Lenh"."MaLenh" into MA_LENH;
				
				insert into "LS_Lenh"("KhoiLuong", "Gia", "GhiChu", "MaTKNVThucHien", "MaTKGD", "MaTyGia", "MaLoaiLenh", "MaTrangThaiLenh", "MaLenh") 
				values(p_khoi_luong, p_gia, 'Nhân viên thêm lệnh + khớp lệnh', MA_TK_NGUOI_DAT, p_ma_tkgd, p_ma_ty_gia, p_ma_loai_lenh, p_ma_trang_thai_lenh, MA_LENH);
									
			else
				insert into "Lenh"("KhoiLuong", "Gia", "GhiChu", "MaTKNVDat", "MaTKGD", "MaTyGia", "MaLoaiLenh", "MaTrangThaiLenh") 
				values(p_khoi_luong, p_gia, p_ghi_chu, MA_TK_NGUOI_DAT, p_ma_tkgd, p_ma_ty_gia, p_ma_loai_lenh, p_ma_trang_thai_lenh)
				returning "Lenh"."MaLenh" into MA_LENH;
									
				insert into "LS_Lenh"("KhoiLuong", "Gia", "GhiChu", "MaTKNVThucHien", "MaTKGD", "MaTyGia", "MaLoaiLenh", "MaTrangThaiLenh", "MaLenh") 
				values(p_khoi_luong, p_gia, 'Nhân viên thêm lệnh', MA_TK_NGUOI_DAT, p_ma_tkgd, p_ma_ty_gia, p_ma_loai_lenh, p_ma_trang_thai_lenh, MA_LENH);
			end if;
		
		else
		
			p_status_code := 400;
			p_status_msg := 'Tên đăng nhập không tồn tại hoặc đã bị khóa!';
		end if;
	end if;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 "  DROP FUNCTION public.fn_add_offer(p_ten_dang_nhap character varying, p_khoi_luong integer, p_gia real, p_ghi_chu character varying, p_ma_tkgd integer, p_ma_ty_gia integer, p_ma_loai_lenh integer, p_ma_trang_thai_lenh integer, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    28426 8   fn_add_trading_acc(character varying, character varying)    FUNCTION     �  CREATE FUNCTION public.fn_add_trading_acc(p_ten_dang_nhap character varying, p_mat_khau character varying, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
	begin
	
		p_status_code := 200;
		p_status_msg := 'Ok';
		
		if exists(select from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_ten_dang_nhap and "MatKhau" = p_mat_khau) then
			insert into "TaiKhoanGiaoDich"("SoDu", "TrangThai", "MaTKNDT") values (0, true, (select "MaTKNDT" from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_ten_dang_nhap and "MatKhau" = p_mat_khau));
			
		elsif exists(select from "TaiKhoanNhanVien" where "TenDangNhap" = p_ten_dang_nhap and "MatKhau" = p_mat_khau) then
-- 			insert into "TaiKhoanGiaoDich"("SoDu", "TrangThai", "MaTKNDT") values (0, true, (select "MaTKNDT" from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_ten_dang_nhap and "MatKhau" = p_mat_khau));
			p_status_code := 400;
			p_status_msg := 'Không có quyền thêm TKGD!';
		
		else
			p_status_code := 400;
			p_status_msg := 'Mật khẩu không chính xác!';
		end if;
		
		exception when others then
			p_status_code := 500;
			RAISE exception '% %', SQLERRM, SQLSTATE;
			
	end
	$$;
 �   DROP FUNCTION public.fn_add_trading_acc(p_ten_dang_nhap character varying, p_mat_khau character varying, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    21646 3   fn_check_auth(character varying, character varying)    FUNCTION     �  CREATE FUNCTION public.fn_check_auth(p_username character varying, p_password character varying, OUT p_is_authenticated boolean, OUT p_group character varying, OUT p_type character varying, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin 
	p_status_code := 200;
	p_is_authenticated := false;
	
	if exists(select from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_username and "TrangThai" = false) then
		p_status_code := 423;
		p_status_msg := 'Tài khoản đã bị khóa!';
		
	elsif exists(select from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_username and "MatKhau" = p_password and "TrangThai" = true) then
		select nq."TenNhomQuyen" into p_group
		from (select "MaNhomQuyen" from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_username and "MatKhau" = p_password and "TrangThai" = true) tk
		join "NhomQuyen" nq on tk."MaNhomQuyen" = nq."MaNhomQuyen";
		p_is_authenticated := true;
		p_type := 'NDT';
		p_status_msg := 'Ok';
		
	elsif exists(select from "TaiKhoanNhanVien" where "TenDangNhap" = p_username and "TrangThai" = false) then
		p_status_code := 423;
		p_status_msg := 'Tài khoản đã bị khóa!';
		
	elsif exists(select from "TaiKhoanNhanVien" where "TenDangNhap" = p_username and "MatKhau" = p_password and "TrangThai" = true) then
		select nq."TenNhomQuyen" into p_group
		from (select "MaNhomQuyen" from "TaiKhoanNhanVien" where "TenDangNhap" = p_username and "MatKhau" = p_password and "TrangThai" = true) tk
		join "NhomQuyen" nq on tk."MaNhomQuyen" = nq."MaNhomQuyen";
		p_is_authenticated := true;
		p_type := 'NV';
		p_status_msg := 'Ok';
		
	else
		p_status_code := 400;
		p_status_msg := 'Tên đăng nhập hoặc mật khẩu không chính xác!';
	end if;

	exception when others then
		-- Lỗi trong lúc thực hiện query
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_check_auth(p_username character varying, p_password character varying, OUT p_is_authenticated boolean, OUT p_group character varying, OUT p_type character varying, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    21958     fn_delete_account_staff(integer)    FUNCTION     �  CREATE FUNCTION public.fn_delete_account_staff(p_ma_tknv integer, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE
 MA_NV int4;
begin
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	delete from "TaiKhoanNhanVien" where "MaTKNV" = p_ma_tknv;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 �   DROP FUNCTION public.fn_delete_account_staff(p_ma_tknv integer, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    21961 !   fn_delete_account_trader(integer)    FUNCTION     �  CREATE FUNCTION public.fn_delete_account_trader(p_ma_tkndt integer, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE
 MA_NV int4;
begin
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	delete from "TaiKhoanNhaDauTu" where "MaTKNDT" = p_ma_tkndt;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 �   DROP FUNCTION public.fn_delete_account_trader(p_ma_tkndt integer, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    21949    fn_delete_group(integer)    FUNCTION     �  CREATE FUNCTION public.fn_delete_group(p_groupid integer, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
declare

begin
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	delete from "NhomQuyen" where "MaNhomQuyen" = p_groupId;	

	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 x   DROP FUNCTION public.fn_delete_group(p_groupid integer, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    28397 x   fn_deposit(character varying, integer, real, character varying, character varying, character varying, character varying)    FUNCTION     �  CREATE FUNCTION public.fn_deposit(p_username character varying, p_ma_tkgd integer, p_so_tien real, p_ten_chu_the character varying, p_so_tknh character varying, p_ten_ngan_hang character varying, p_ten_chi_nhanh_ngan_hang character varying, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin 
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	update "TaiKhoanGiaoDich" set "SoDu" = "SoDu" + p_so_tien where "MaTKGD" = p_ma_tkgd;
	
	insert into "BienDongSoDu" ("ThoiGian", "LoaiBienDong", "SoTienBienDong", "LyDo", "MaTKGD", "NguoiThucHien", "TenChuThe", "SoTKNH", "TenNganHang", "TenChiNhanh")
	values (timezone('utc'::text, now()), true, p_so_tien, 'Nạp tiền vào tài khoản', p_ma_tkgd, p_username, p_ten_chu_the, p_so_tknh, p_ten_ngan_hang, p_ten_chi_nhanh_ngan_hang);
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 /  DROP FUNCTION public.fn_deposit(p_username character varying, p_ma_tkgd integer, p_so_tien real, p_ten_chu_the character varying, p_so_tknh character varying, p_ten_ngan_hang character varying, p_ten_chi_nhanh_ngan_hang character varying, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    28377    fn_get_asset(character varying)    FUNCTION     �	  CREATE FUNCTION public.fn_get_asset(p_username character varying, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin 
	p_refcursor := 'p_refcursor';
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	if exists(select from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_username and "TrangThai" = true) then
		open p_refcursor for
			select sh."MaTyGia",
				tg."MaDongTienYetGia" as "MaDongTienYetGia", 
				tg."MaDongTienDinhGia" as "MaDongTienDinhGia",
				tg."MaDongTienYetGia" ||'/'|| tg."MaDongTienDinhGia" as "TenTyGia",
				(select "TenTienTe" from "TienTe" where "MaTienTe" = tg."MaDongTienYetGia") as "TenDongTienYetGia",
				(select "TenTienTe" from "TienTe" where "MaTienTe" = tg."MaDongTienDinhGia") as "TenDongTienDinhGia",
				sum(sh."KhoiLuong") as "KhoiLuong",
				sh."MaTKNDT",
				tkndt."TenDangNhap" as "TenTKChuSoHuu"
			from "SoHuu" sh
			join "TyGia" tg on tg."MaTyGia" = sh."MaTyGia"
			join (select "MaTKNDT", "TenDangNhap" from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_username) tkndt on tkndt."MaTKNDT" = sh."MaTKNDT"
			where "KhoiLuong" != 0
			group by sh."MaTyGia", "MaDongTienYetGia", "MaDongTienDinhGia",
			"TenTyGia", "TenDongTienYetGia", "TenDongTienDinhGia", sh."MaTKNDT", tkndt."TenDangNhap";
		
	elsif exists(select from "TaiKhoanNhanVien" where "TenDangNhap" = p_username and "TrangThai" = true) then
		open p_refcursor for
			select sh."MaTyGia",
				tg."MaDongTienYetGia" as "MaDongTienYetGia", 
				tg."MaDongTienDinhGia" as "MaDongTienDinhGia",
				tg."MaDongTienYetGia" ||'/'|| tg."MaDongTienDinhGia" as "TenTyGia",
				(select "TenTienTe" from "TienTe" where "MaTienTe" = tg."MaDongTienYetGia") as "TenDongTienYetGia",
				(select "TenTienTe" from "TienTe" where "MaTienTe" = tg."MaDongTienDinhGia") as "TenDongTienDinhGia",
				sum(sh."KhoiLuong") as "KhoiLuong",
				sh."MaTKNDT",
				tkndt."TenDangNhap" as "TenTKChuSoHuu"
			from "SoHuu" sh
			join "TyGia" tg on tg."MaTyGia" = sh."MaTyGia"
			join "TaiKhoanNhaDauTu" tkndt on tkndt."MaTKNDT" = sh."MaTKNDT"
			where "KhoiLuong" != 0
			group by sh."MaTyGia", "MaDongTienYetGia", "MaDongTienDinhGia",
			"TenTyGia", "TenDongTienYetGia", "TenDongTienDinhGia", sh."MaTKNDT", tkndt."TenDangNhap";
		
	else
		p_status_code := 400;
		p_status_msg := 'Tên đăng nhập không tồn tại!';
		
	end if;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_get_asset(p_username character varying, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    21647    fn_get_currency_rate()    FUNCTION     >  CREATE FUNCTION public.fn_get_currency_rate(OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin
	p_refcursor := 'p_refcursor';
	p_status_code := 200;
	open p_refcursor for
		select "MaTyGia" as currency_rate_id,
			"MaDongTienYetGia" || "MaDongTienDinhGia" as code,
			"MaDongTienYetGia" || '/' || "MaDongTienDinhGia" as name
		from "TyGia" where "TrangThai" = true;
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_get_currency_rate(OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    21672    fn_get_group()    FUNCTION     @  CREATE FUNCTION public.fn_get_group(OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin 
	p_refcursor := 'p_refcursor';
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	open p_refcursor for
		select "MaNhomQuyen" as group_id,
			"TenNhomQuyen" as group_name,
			"TrangThai" as is_active,
			"GhiChu" as description 
		from "NhomQuyen"
		order by "MaNhomQuyen" asc;
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 }   DROP FUNCTION public.fn_get_group(OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    21917    fn_get_info_staff()    FUNCTION     u  CREATE FUNCTION public.fn_get_info_staff(OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin
	p_status_code := 200;
	p_status_msg := 'OK';
	p_refcursor := 'p_refcursor';
	
	open p_refcursor for
		select nv."MaNV" as "staff_id",
			nv."Ho" as first_name,
			nv."Ten" last_name,
			COALESCE(nv."Ho", '') || ' ' || COALESCE(nv."Ten", '') as full_name,
			tknv."TenDangNhap" as user_name,
			tknv."TrangThai" as status_acc,
			tknv."MaTKNV" as acc_id,
			tknv."GhiChu" as description,
			nv."GioiTinh" as gender,
			nv."SDT" as phone,
			nv."Email" as email,
			nv."CMND" as identity_card,
			nv."NgayCap" as issued_on,
			nv."NoiCap" as issued_by,
			nv."DiaChi" as address,
			nq."MaNhomQuyen" as group_id,
			nq."TenNhomQuyen" as group_name
		from "NhanVien" nv
		left join "TaiKhoanNhanVien" tknv on tknv."MaNV" = nv."MaNV"
		join "NhomQuyen" nq on nq."MaNhomQuyen" = tknv."MaNhomQuyen"
		order by tknv."MaTKNV";

	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 �   DROP FUNCTION public.fn_get_info_staff(OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    21918    fn_get_info_trader()    FUNCTION     �  CREATE FUNCTION public.fn_get_info_trader(OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin
	p_status_code := 200;
	p_status_msg := 'OK';
	p_refcursor := 'p_refcursor';
	
	open p_refcursor for
		select ndt."MaNDT" as "trader_id",
			ndt."Ho" as first_name,
			ndt."Ten" last_name,
			COALESCE(ndt."Ho", '') || ' ' || COALESCE(ndt."Ten", '') as full_name,
			tkndt."TenDangNhap" as user_name,
			tkndt."TrangThai" as status_acc,
			tkndt."MaTKNDT" as acc_id,
			tkndt."GhiChu" as description,
			ndt."GioiTinh" as gender,
			ndt."SDT" as phone,
			ndt."Email" as email,
			ndt."CMND" as identity_card,
			ndt."NgayCap" as issued_on,
			ndt."NoiCap" as issued_by,
			ndt."DiaChi" as address,
			nq."MaNhomQuyen" as group_id,
			nq."TenNhomQuyen" as group_name
		from "NhaDauTu" ndt
		left join "TaiKhoanNhaDauTu" tkndt on tkndt."MaNDT" = ndt."MaNDT"
		join "NhomQuyen" nq on nq."MaNhomQuyen" = tkndt."MaNhomQuyen"
		order by tkndt."MaTKNDT";

	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 �   DROP FUNCTION public.fn_get_info_trader(OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    21673    fn_get_info_trader(integer)    FUNCTION       CREATE FUNCTION public.fn_get_info_trader(p_trading_acc_id integer, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin	
	
	p_refcursor := 'p_refcursor';
	p_status_code := 200;	
	p_status_msg := 'Ok';

	if not exists(select from "TaiKhoanGiaoDich" where "MaTKGD" = p_trading_acc_id) then 
		p_status_code := 400;
		p_status_msg := 'Tài khoản giao dịch không tồn tại!';
	else
		open p_refcursor for													
			select tk."MaNDT" as trader_id,
			"Ho" as first_name,
			"Ten" as last_name,
			"Ho" || ' ' || "Ten" as full_name,
			"GioiTinh" as gender,
			"SDT" as phone 
			from (select "MaNDT" 
							from "TaiKhoanNhaDauTu" 
							where "MaTKNDT" = (select "MaTKNDT" from "TaiKhoanGiaoDich"
											where "MaTKGD" = p_trading_acc_id)) tk
			join "NhaDauTu" ndt on tk."MaNDT" = ndt."MaNDT";
	end if;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_get_info_trader(p_trading_acc_id integer, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    21645    fn_get_menu(character varying)    FUNCTION     �  CREATE FUNCTION public.fn_get_menu(p_username character varying, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin
	p_refcursor := 'p_refcursor';
	p_status_code := 200;

	if EXISTS (SELECT FROM "TaiKhoanNhaDauTu" where "TrangThai" = true and "TenDangNhap" = p_username) then
		open p_refcursor for 
			select nq."TenNhomQuyen" as group_name , 
				cn."MaChucNang" as functionary_id, 
				cn."TenChucNang" as functionary_name, 
				cn."DuongDan" as functionary_path, 
				q."MaQuyen" as role_id, 
				q."TenQuyen" as role_name, 
				q."DuongDan" as role_path, 
				ctq."Xem" as is_select, 
				ctq."Them" as is_insert, 
				ctq."Sua" as is_update, 
				ctq."Xoa" as is_delete
			from (select "MaNhomQuyen" from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_username and "TrangThai" = true) tk
			join "NhomQuyen" nq on tk."MaNhomQuyen" = nq."MaNhomQuyen"
			join "CT_Quyen" ctq on ctq."MaNhomQuyen" = nq."MaNhomQuyen"
			join "Quyen" q on q."MaQuyen" = ctq."MaQuyen"
			join "ChucNang" cn on cn."MaChucNang" = q."MaChucNang"
			ORDER BY cn."MaChucNang", q."MaQuyen" asc;
	elsif EXISTS (SELECT FROM "TaiKhoanNhanVien" where "TrangThai" = true and "TenDangNhap" = p_username) then
		open p_refcursor for 
			select nq."TenNhomQuyen" as group_name , 
				cn."MaChucNang" as functionary_id, 
				cn."TenChucNang" as functionary_name, 
				cn."DuongDan" as functionary_path, 
				q."MaQuyen" as role_id, 
				q."TenQuyen" as role_name, 
				q."DuongDan" as role_path, 
				ctq."Xem" as is_select, 
				ctq."Them" as is_insert, 
				ctq."Sua" as is_update, 
				ctq."Xoa" as is_delete
			from (select "MaNhomQuyen" from "TaiKhoanNhanVien" where "TenDangNhap" = p_username and "TrangThai" = true) tk
			join "NhomQuyen" nq on tk."MaNhomQuyen" = nq."MaNhomQuyen"
			join "CT_Quyen" ctq on ctq."MaNhomQuyen" = nq."MaNhomQuyen"
			join "Quyen" q on q."MaQuyen" = ctq."MaQuyen"
			join "ChucNang" cn on cn."MaChucNang" = q."MaChucNang"
			ORDER BY cn."MaChucNang", q."MaQuyen" asc;
	else
		p_status_code := 400;
		p_status_msg := 'username not found';
	end if;
	
	EXCEPTION WHEN OTHERS then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
		
end
$$;
 �   DROP FUNCTION public.fn_get_menu(p_username character varying, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            
           1255    21909    fn_get_offer(character varying)    FUNCTION     �  CREATE FUNCTION public.fn_get_offer(p_username character varying, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin	
	
	p_refcursor := 'p_refcursor';
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	if EXISTS (SELECT FROM "TaiKhoanNhaDauTu" where "TrangThai" = true and "TenDangNhap" = p_username) then
		open p_refcursor for
			select l."MaLenh" as "order_id", 
			l."MaTKGD" as "trading_acc_id",
			l."MaTyGia" as "currency_rate_id", 
			l."KhoiLuong" as "quantity", 
			l."Gia" as "price",
			l."MaTKNDTDat" as "MaTKNDTDat",
			(select "TenDangNhap" from "TaiKhoanNhaDauTu" where "MaTKNDT" = l."MaTKNDTDat") as "TenTKNDTDat", 
			l."MaTKNVDat" as "MaTKNVDat",
			(select "TenDangNhap" from "TaiKhoanNhanVien" where "MaTKNV" = l."MaTKNVDat") as "TenTKNVDat",
			l."MaTKNVKhop" as "MaTKNVKhop",
			(select "TenDangNhap" from "TaiKhoanNhanVien" where "MaTKNV" = l."MaTKNVKhop") as "TenTKNVKhop", 
			l."ThoiGianDatLenh" as "TGDat", 
			l."ThoiGianKhopLenh" as "TGKhop",
			l."GhiChu" as description,
			tg."MaDongTienYetGia" as "MaDongTienYetGia", 
			tg."MaDongTienDinhGia" as "MaDongTienDinhGia", 
			(select "TenTienTe" from "TienTe" where "MaTienTe" = tg."MaDongTienYetGia") as "TenDongTienYetGia",
			(select "TenTienTe" from "TienTe" where "MaTienTe" = tg."MaDongTienDinhGia") as "TenDongTienDinhGia",
			ll."MaLoaiLenh" as "type_order_id",
			ll."TenLoaiLenh" as "type_order_name",
			ttl."MaTrangThaiLenh" as "status_order_id",
			ttl."TenTrangThaiLenh" as "status_order_name"
-- 		from "Lenh" l
-- 		join (select "MaTKNDT", "TenDangNhap" from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_username) tkndt on l."MaTKNDTDat" = tkndt."MaTKNDT"
-- 		join "TyGia" tg on l."MaTyGia" = tg."MaTyGia"
-- 		join "LoaiLenh" ll on ll."MaLoaiLenh" = l."MaLoaiLenh"
-- 		join "TrangThaiLenh" ttl on ttl."MaTrangThaiLenh" = l."MaTrangThaiLenh"
-- 		order by l."MaLenh" asc;
			from (select "MaTKNDT", "TenDangNhap" from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_username) tkndt
			join "TaiKhoanGiaoDich" tkgd on tkndt."MaTKNDT" = tkgd."MaTKNDT"
			join "Lenh" l on l."MaTKGD" = tkgd."MaTKGD"
			join "TyGia" tg on l."MaTyGia" = tg."MaTyGia"
			join "LoaiLenh" ll on ll."MaLoaiLenh" = l."MaLoaiLenh"
			join "TrangThaiLenh" ttl on ttl."MaTrangThaiLenh" = l."MaTrangThaiLenh"
			order by l."MaLenh" desc;
				
	elsif EXISTS (SELECT FROM "TaiKhoanNhanVien" where "TrangThai" = true and "TenDangNhap" = p_username) then
	open p_refcursor for
-- 		select l."MaLenh" as "order_id", 
-- 			l."MaTrangThaiLenh" as "status_order_id",
-- 			ttl."TenTrangThaiLenh" as "status_order_name",
-- 			l."MaTKGD" as "trading_acc_id",
-- 			l."MaLoaiLenh" as "type_order_id",
-- 			ll."TenLoaiLenh" as "type_order_name",
-- 			l."MaTyGia" as "currency_rate_id", 
-- 			tg."MaDongTienYetGia" as "MaDongTienYetGia", 
-- 			tg."MaDongTienDinhGia" as "MaDongTienDinhGia", 
-- 			(select "TenTienTe" from "TienTe" where "MaTienTe" = tg."MaDongTienYetGia") as "TenDongTienYetGia",
-- 			(select "TenTienTe" from "TienTe" where "MaTienTe" = tg."MaDongTienDinhGia") as "TenDongTienDinhGia",
-- 			l."KhoiLuong" as "quantity", 
-- 			l."Gia" as "price", 
-- 			tkndt."TenDangNhap" as "NDTDat",
-- 			NULL as "NVDat", 
-- 			(select "TenDangNhap" from "TaiKhoanNhanVien" where "MaTKNV" = l."MaTKNVKhop") as "NVKhop", 
-- 			l."ThoiGianDatLenh" as "TGDat", 
-- 			l."ThoiGianKhopLenh" as "TGKhop",
-- 			l."GhiChu" as description
-- 		from "Lenh" l
-- 		LEFT JOIN "TaiKhoanNhaDauTu" tkndt on l."MaTKNDTDat" = tkndt."MaNDT"
-- 		LEFT JOIN "TaiKhoanNhanVien" tknv on l."MaTKNVDat" = tknv."MaNV"
-- 		join "TyGia" tg on l."MaTyGia" = tg."MaTyGia"
-- 		join "LoaiLenh" ll on ll."MaLoaiLenh" = l."MaLoaiLenh"
-- 		join "TrangThaiLenh" ttl on ttl."MaTrangThaiLenh" = l."MaTrangThaiLenh"
-- 		order by l."MaLenh" asc;

		select l."MaLenh" as "order_id", 
			l."MaTKGD" as "trading_acc_id",
			l."MaTyGia" as "currency_rate_id", 
			l."KhoiLuong" as "quantity", 
			l."Gia" as "price",
			l."MaTKNDTDat" as "MaTKNDTDat",
			(select "TenDangNhap" from "TaiKhoanNhaDauTu" where "MaTKNDT" = l."MaTKNDTDat") as "TenTKNDTDat", 
			l."MaTKNVDat" as "MaTKNVDat",
			(select "TenDangNhap" from "TaiKhoanNhanVien" where "MaTKNV" = l."MaTKNVDat") as "TenTKNVDat",
			l."MaTKNVKhop" as "MaTKNVKhop",
			(select "TenDangNhap" from "TaiKhoanNhanVien" where "MaTKNV" = l."MaTKNVKhop") as "TenTKNVKhop", 
			l."ThoiGianDatLenh" as "TGDat", 
			l."ThoiGianKhopLenh" as "TGKhop",
			l."GhiChu" as description,
			tg."MaDongTienYetGia" as "MaDongTienYetGia", 
			tg."MaDongTienDinhGia" as "MaDongTienDinhGia", 
			(select "TenTienTe" from "TienTe" where "MaTienTe" = tg."MaDongTienYetGia") as "TenDongTienYetGia",
			(select "TenTienTe" from "TienTe" where "MaTienTe" = tg."MaDongTienDinhGia") as "TenDongTienDinhGia",
			ll."MaLoaiLenh" as "type_order_id",
			ll."TenLoaiLenh" as "type_order_name",
			ttl."MaTrangThaiLenh" as "status_order_id",
			ttl."TenTrangThaiLenh" as "status_order_name"
		from "Lenh" l
		join "TyGia" tg on l."MaTyGia" = tg."MaTyGia"
		join "LoaiLenh" ll on ll."MaLoaiLenh" = l."MaLoaiLenh"
		join "TrangThaiLenh" ttl on ttl."MaTrangThaiLenh" = l."MaTrangThaiLenh"
		order by l."MaLenh" desc;
			
	else 
		p_status_code := 400;
		p_status_msg := 'Tên đăng nhập không tồn tại!';
	end if;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_get_offer(p_username character varying, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    28396    fn_get_offer_history(integer)    FUNCTION       CREATE FUNCTION public.fn_get_offer_history(p_ma_lenh integer, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin	
	
	p_refcursor := 'p_refcursor';
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	open p_refcursor for
		select lsl."MaLSLenh" as "order_history_id",
		lsl."MaLenh" as order_id,
		lsl."MaTKGD" as "trading_acc_id",
		lsl."MaTyGia" as "currency_rate_id", 
		lsl."KhoiLuong" as "quantity", 
		lsl."Gia" as "price",
		lsl."MaTKNDTThucHien" as "MaTKNDTThucHien",
		(select "TenDangNhap" from "TaiKhoanNhaDauTu" where "MaTKNDT" = lsl."MaTKNDTThucHien") as "TenTKNDTThucHien", 
		lsl."MaTKNVThucHien" as "MaTKNVThucHien",
		(select "TenDangNhap" from "TaiKhoanNhanVien" where "MaTKNV" = lsl."MaTKNVThucHien") as "TenTKNVThucHien",
		lsl."ThoiGianThucHien" as "TGThucHien",
		lsl."GhiChu" as description,
		tg."MaDongTienYetGia" as "MaDongTienYetGia", 
		tg."MaDongTienDinhGia" as "MaDongTienDinhGia", 
		(select "TenTienTe" from "TienTe" where "MaTienTe" = tg."MaDongTienYetGia") as "TenDongTienYetGia",
		(select "TenTienTe" from "TienTe" where "MaTienTe" = tg."MaDongTienDinhGia") as "TenDongTienDinhGia",
		ll."MaLoaiLenh" as "type_order_id",
		ll."TenLoaiLenh" as "type_order_name",
		ttl."MaTrangThaiLenh" as "status_order_id",
		ttl."TenTrangThaiLenh" as "status_order_name"
		from "TyGia" tg
		join (select * from "LS_Lenh" where "MaLenh" = p_ma_lenh) lsl on lsl."MaTyGia" = tg."MaTyGia"
		join "LoaiLenh" ll on ll."MaLoaiLenh" = lsl."MaLoaiLenh" 
		join "TrangThaiLenh" ttl on ttl."MaTrangThaiLenh" = lsl."MaTrangThaiLenh"
		order by lsl."MaLSLenh" desc;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_get_offer_history(p_ma_lenh integer, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    28403 !   fn_get_revenue(character varying)    FUNCTION     u  CREATE FUNCTION public.fn_get_revenue(p_username character varying, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin	
	
	p_refcursor := 'p_refcursor';
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	if EXISTS (SELECT FROM "TaiKhoanNhaDauTu" where "TrangThai" = true and "TenDangNhap" = p_username) then
		open p_refcursor for
			select date_part('isodow', l."ThoiGianKhopLenh") + 1 as "Thu",
				date(l."ThoiGianKhopLenh") as "Ngay",
				l."MaLoaiLenh",
				ll."TenLoaiLenh",
				count(l."MaLoaiLenh") "TongSoLenh",
				sum(l."KhoiLuong" * l."Gia") "TongTien"
			from (select * from "Lenh" where "MaTrangThaiLenh" = 2 and date_part('month', "ThoiGianKhopLenh") = date_part('month', now()) and date_part('year', "ThoiGianKhopLenh") = date_part('year', now())) l
			join (select "MaTKGD" from "TaiKhoanGiaoDich"
						where "MaTKNDT" = (select "MaTKNDT" from "TaiKhoanNhaDauTu"
																where "TenDangNhap" = p_username)) tkgd
			on l."MaTKGD" = tkgd."MaTKGD"
			join "LoaiLenh" ll
			on ll."MaLoaiLenh" = l."MaLoaiLenh"
			group by "Thu", "Ngay", l."MaLoaiLenh", ll."TenLoaiLenh"
			order by "Ngay" asc;
				
	elsif EXISTS (SELECT FROM "TaiKhoanNhanVien" where "TrangThai" = true and "TenDangNhap" = p_username) then
	open p_refcursor for
		select date_part('isodow', l."ThoiGianKhopLenh") + 1 as "Thu",
			date(l."ThoiGianKhopLenh") as "Ngay",
			l."MaLoaiLenh",
			ll."TenLoaiLenh",
			count(l."MaLoaiLenh") "TongSoLenh",
			sum(l."KhoiLuong" * l."Gia") "TongTien"
		from (select * from "Lenh" where "MaTrangThaiLenh" = 2 and date_part('month', "ThoiGianKhopLenh") = date_part('month', now()) and date_part('year', "ThoiGianKhopLenh") = date_part('year', now())) l
		join "LoaiLenh" ll
		on ll."MaLoaiLenh" = l."MaLoaiLenh"
		group by "Thu", "Ngay", l."MaLoaiLenh", ll."TenLoaiLenh"
		order by "Ngay" asc;
		
	else 
		p_status_code := 400;
		p_status_msg := 'Tên đăng nhập không tồn tại!';
	end if;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_get_revenue(p_username character varying, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    21913 $   fn_get_role_claim(character varying)    FUNCTION     *  CREATE FUNCTION public.fn_get_role_claim(p_ten_nhom_quyen character varying, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
declare 

begin
	p_status_code := 200;
	p_refcursor := 'p_refcursor';
	
	if exists(select from "NhomQuyen" where "TenNhomQuyen" = p_ten_nhom_quyen) then 
		open p_refcursor for
			select nq."MaNhomQuyen",
				nq."TenNhomQuyen",
				cn."MaChucNang",
				cn."TenChucNang",
				cn."DuongDan" as "DuongDanChucNang",
				q."MaQuyen",
				q."TenQuyen", 
				q."DuongDan" as "DuongDanQuyen",
				COALESCE(ctq."Xem", false) as "Xem",
				COALESCE(ctq."Them", false) as "Them",
				COALESCE(ctq."Sua", false) as "Sua",
				COALESCE(ctq."Xoa", false) as "Xoa"
			from (select "MaNhomQuyen", "TenNhomQuyen" from "NhomQuyen" where "TenNhomQuyen" = p_ten_nhom_quyen) nq
			join "CT_Quyen" ctq on nq."MaNhomQuyen" = ctq."MaNhomQuyen"
			right join "Quyen" q on ctq."MaQuyen" = q."MaQuyen"
			right join "ChucNang" cn on q."MaChucNang" = cn."MaChucNang"
			ORDER BY cn."MaChucNang" asc;
	else
	
		p_status_code := 400;
		p_status_msg := 'Nhóm quyền không tồn tại!';
	end if;

	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_get_role_claim(p_ten_nhom_quyen character varying, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    28369    fn_get_status_order()    FUNCTION     `  CREATE FUNCTION public.fn_get_status_order(OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin 
	p_refcursor := 'p_refcursor';
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	open p_refcursor for
		select "MaTrangThaiLenh" as status_order_id,
			"TenTrangThaiLenh" as status_order_name,
			"GhiChu" as description 
		from "TrangThaiLenh" where "TrangThai" = true
		order by "MaTrangThaiLenh" asc;
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_get_status_order(OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            	           1255    21671 %   fn_get_trading_acc(character varying)    FUNCTION     �  CREATE FUNCTION public.fn_get_trading_acc(p_username character varying, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin 
	p_refcursor := 'p_refcursor';
	p_status_code := 200;
	p_status_msg := 'Ok';
-- 	
	if exists(select from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_username and "TrangThai" = true) then
		open p_refcursor for
			select tkgd."MaTKGD" as trading_acc_id,
				tkgd."SoDu" as amount,
				tkgd."TrangThai" as status,
				tkndt."TenDangNhap" as user_name
			from (select "MaTKNDT" from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_username and "TrangThai" = true) tk
			join "TaiKhoanGiaoDich" tkgd on tk."MaTKNDT" = tkgd."MaTKNDT"
			join "TaiKhoanNhaDauTu" tkndt on tkndt."MaTKNDT" = tkgd."MaTKNDT"
			order by tkgd."MaTKGD";
		
	elsif exists(select from "TaiKhoanNhanVien" where "TenDangNhap" = p_username and "TrangThai" = true) then
		open p_refcursor for
			select tkgd."MaTKGD" as trading_acc_id,
				tkgd."SoDu" as amount,
				tkgd."TrangThai" as status,
				tkndt."TenDangNhap" as user_name
			from "TaiKhoanGiaoDich" tkgd
			join "TaiKhoanNhaDauTu" tkndt on tkndt."MaTKNDT" = tkgd."MaTKNDT"
			order by tkgd."MaTKGD";
		
	else
		p_status_code := 400;
		p_status_msg := 'Tên đăng nhập không tồn tại!';
		
	end if;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_get_trading_acc(p_username character varying, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    28401 #   fn_get_trading_acc_history(integer)    FUNCTION       CREATE FUNCTION public.fn_get_trading_acc_history(p_trading_acc_id integer, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin
	p_refcursor := 'p_refcursor';
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	open p_refcursor for
		select * from "BienDongSoDu" where "MaTKGD" = p_trading_acc_id
		order by "MaBienDongSoDu" desc;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_get_trading_acc_history(p_trading_acc_id integer, OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    21963    fn_get_type_order()    FUNCTION     F  CREATE FUNCTION public.fn_get_type_order(OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin 
	p_refcursor := 'p_refcursor';
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	open p_refcursor for
		select "MaLoaiLenh" as type_order_id,
			"TenLoaiLenh" as type_order_name,
			"GhiChu" as description 
		from "LoaiLenh" where "TrangThai" = true
		order by "MaLoaiLenh" asc;
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 �   DROP FUNCTION public.fn_get_type_order(OUT p_refcursor refcursor, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                        1255    21957 �   fn_update_account_staff(character varying, character varying, boolean, character varying, character varying, character varying, date, character varying, character varying, boolean, character varying, integer, integer)    FUNCTION     �  CREATE FUNCTION public.fn_update_account_staff(p_ho character varying, p_ten character varying, p_gioi_tinh boolean, p_email character varying, p_sdt character varying, p_cmnd character varying, p_ngay_cap date, p_noi_cap character varying, p_dia_chi character varying, p_trang_thai_tk boolean, p_ghi_chu character varying, p_ma_nhom_quyen integer, p_ma_tknv integer, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE
 MA_NV int4;
begin
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	if exists(select from "NhanVien" where "CMND" = p_cmnd) then
		update "NhanVien" set "Ho" = p_ho, "Ten" = p_ten, "GioiTinh" = p_gioi_tinh, "Email" = p_email, "SDT" = p_sdt, "NgayCap" = p_ngay_cap, "NoiCap" = p_noi_cap, "DiaChi" = p_dia_chi, "GhiChu" = 'Cập nhật nhân viên' where "CMND" = p_cmnd
		returning "NhanVien"."MaNV" into MA_NV;
	
	else
		insert into "NhanVien" ("Ho", "Ten", "GioiTinh", "Email", "SDT", "CMND", "NgayCap", "NoiCap", "DiaChi", "GhiChu")
		values (p_ho, p_ten, p_gioi_tinh, p_email, p_sdt, p_cmnd, p_ngay_cap, p_noi_cap, p_dia_chi, 'Thêm nhân viên')
		returning "NhanVien"."MaNV" into MA_NV;
	end if;
	
	update "TaiKhoanNhanVien" set "TrangThai" = p_trang_thai_tk, "GhiChu" = p_ghi_chu, "MaNV" = MA_NV, "MaNhomQuyen" = p_ma_nhom_quyen where "MaTKNV" = p_ma_tknv;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 �  DROP FUNCTION public.fn_update_account_staff(p_ho character varying, p_ten character varying, p_gioi_tinh boolean, p_email character varying, p_sdt character varying, p_cmnd character varying, p_ngay_cap date, p_noi_cap character varying, p_dia_chi character varying, p_trang_thai_tk boolean, p_ghi_chu character varying, p_ma_nhom_quyen integer, p_ma_tknv integer, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    21960 �   fn_update_account_trader(character varying, character varying, boolean, character varying, character varying, character varying, date, character varying, character varying, boolean, character varying, integer, integer)    FUNCTION     �  CREATE FUNCTION public.fn_update_account_trader(p_ho character varying, p_ten character varying, p_gioi_tinh boolean, p_email character varying, p_sdt character varying, p_cmnd character varying, p_ngay_cap date, p_noi_cap character varying, p_dia_chi character varying, p_trang_thai_tk boolean, p_ghi_chu character varying, p_ma_nhom_quyen integer, p_ma_tkndt integer, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE
 MA_NDT int4;
begin
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	if exists(select from "NhaDauTu" where "CMND" = p_cmnd) then
		update "NhaDauTu" set "Ho" = p_ho, "Ten" = p_ten, "GioiTinh" = p_gioi_tinh, "Email" = p_email, "SDT" = p_sdt, "NgayCap" = p_ngay_cap, "NoiCap" = p_noi_cap, "DiaChi" = p_dia_chi, "GhiChu" = 'Cập nhật NDT' where "CMND" = p_cmnd
		returning "NhaDauTu"."MaNDT" into MA_NDT;
	
	else
		insert into "NhaDauTu" ("Ho", "Ten", "GioiTinh", "Email", "SDT", "CMND", "NgayCap", "NoiCap", "DiaChi", "GhiChu")
		values (p_ho, p_ten, p_gioi_tinh, p_email, p_sdt, p_cmnd, p_ngay_cap, p_noi_cap, p_dia_chi, 'Thêm NDT')
		returning "NhaDauTu"."MaNDT" into MA_NDT;
	end if;
	
	update "TaiKhoanNhaDauTu" set "TrangThai" = p_trang_thai_tk, "GhiChu" = p_ghi_chu, "MaNDT" = MA_NDT, "MaNhomQuyen" = p_ma_nhom_quyen where "MaTKNDT" = p_ma_tkndt;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 �  DROP FUNCTION public.fn_update_account_trader(p_ho character varying, p_ten character varying, p_gioi_tinh boolean, p_email character varying, p_sdt character varying, p_cmnd character varying, p_ngay_cap date, p_noi_cap character varying, p_dia_chi character varying, p_trang_thai_tk boolean, p_ghi_chu character varying, p_ma_nhom_quyen integer, p_ma_tkndt integer, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    21948 G   fn_update_group(character varying, boolean, character varying, integer)    FUNCTION     �  CREATE FUNCTION public.fn_update_group(p_groupname character varying, p_isactive boolean, p_description character varying, p_groupid integer, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
declare

begin
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	update "NhomQuyen" set "TenNhomQuyen" = p_groupName, "TrangThai" = p_isactive, "GhiChu" = p_description where "MaNhomQuyen" = p_groupId;
	
	exception
		when sqlstate '23505' then
			p_status_code := 400;
			p_status_msg := 'Tên nhóm quyền đã tồn tại!';
		when others then
			p_status_code := 500;
			RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 �   DROP FUNCTION public.fn_update_group(p_groupname character varying, p_isactive boolean, p_description character varying, p_groupid integer, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    21926 q   fn_update_offer(character varying, integer, integer, real, character varying, integer, integer, integer, integer)    FUNCTION     �  CREATE FUNCTION public.fn_update_offer(p_ten_dang_nhap character varying, p_ma_lenh integer, p_khoi_luong integer, p_gia real, p_ghi_chu character varying, p_ma_tkgd integer, p_ma_ty_gia integer, p_ma_loai_lenh integer, p_ma_trang_thai_lenh integer, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE
		MA_TK_NGUOI_CAP_NHAT int4;
		MA_LENH int4;
		TONG_KHOI_LUONG int4;
		TRANG_THAI_CHO_KHOP int4 := 1;
		TRANG_THAI_DA_KHOP int4 := 2;
		TONG_TIEN_CAC_LENH_CHO_KHOP int4;
		MA_LOAI_LENH_BAN int4 := 1;
		MA_LOAI_LENH_MUA int4 := 2;
begin
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	select SUM("KhoiLuong" * "Gia") as "TongTien" into TONG_TIEN_CAC_LENH_CHO_KHOP
	from "Lenh"
	where "MaLenh" != p_ma_lenh and "MaTKGD" = p_ma_tkgd and "MaTrangThaiLenh" = TRANG_THAI_CHO_KHOP
	GROUP BY "MaTKGD";
	
	select sum("KhoiLuong") into TONG_KHOI_LUONG
	from "SoHuu"
	where "MaTyGia" = p_ma_ty_gia and "MaTKNDT" = (select "MaTKNDT" from "TaiKhoanGiaoDich" where "MaTKGD" = p_ma_tkgd)
	group by "MaTyGia", "MaTKNDT";
	
	if (p_ma_loai_lenh = MA_LOAI_LENH_MUA and (select "SoDu" from "TaiKhoanGiaoDich" where "MaTKGD" = p_ma_tkgd) < TONG_TIEN_CAC_LENH_CHO_KHOP + p_gia*p_khoi_luong) then
		p_status_code := 400;
		p_status_msg := 'Vượt quá số dư có trong tài khoản!';
		
	elsif (p_ma_loai_lenh = MA_LOAI_LENH_BAN and coalesce(TONG_KHOI_LUONG, 0) < p_khoi_luong) then
		p_status_code := 400;
		p_status_msg := 'Vượt quá khối lượng có trong tài khoản!';
	else
		-- Nếu là NDT
		if exists(select from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_ten_dang_nhap and "TrangThai" = true) then
			select "MaTKNDT" into MA_TK_NGUOI_CAP_NHAT from "TaiKhoanNhaDauTu" where "TenDangNhap" = p_ten_dang_nhap;
			
			if p_ma_trang_thai_lenh = TRANG_THAI_DA_KHOP then
				p_status_code := 400;
				p_status_msg := 'Nhà đầu tư không có quyền khớp lệnh!';
			else
				update "Lenh" set "KhoiLuong" = p_khoi_luong, "Gia" = p_gia, "GhiChu" = p_ghi_chu, "MaTKGD" = p_ma_tkgd, "MaTyGia" = p_ma_ty_gia, "MaLoaiLenh" = p_ma_loai_lenh, "MaTrangThaiLenh" = p_ma_trang_thai_lenh where "MaLenh" = p_ma_lenh
				returning "Lenh"."MaLenh" into MA_LENH;
				
				insert into "LS_Lenh"("KhoiLuong", "Gia", "GhiChu", "MaTKNDTThucHien", "MaTKGD", "MaTyGia", "MaLoaiLenh", "MaTrangThaiLenh", "MaLenh")
				values(p_khoi_luong, p_gia, 'Nhà đầu tư cập nhật lệnh', MA_TK_NGUOI_CAP_NHAT, p_ma_tkgd, p_ma_ty_gia, p_ma_loai_lenh, p_ma_trang_thai_lenh, MA_LENH);
			end if;
		
		-- Nếu là nhân viên
		elsif exists(select from "TaiKhoanNhanVien" where "TenDangNhap" = p_ten_dang_nhap and "TrangThai" = true) then
			select "MaTKNV" into MA_TK_NGUOI_CAP_NHAT from "TaiKhoanNhanVien" where "TenDangNhap" = p_ten_dang_nhap;
			
			if p_ma_trang_thai_lenh = TRANG_THAI_DA_KHOP then
				--1. Cập nhật lệnh
				update "Lenh" set "KhoiLuong" = p_khoi_luong, "Gia" = p_gia, "GhiChu" = p_ghi_chu, "MaTKNVKhop" = MA_TK_NGUOI_CAP_NHAT,
			"ThoiGianKhopLenh" = (timezone('utc'::text, now())),	"MaTKGD" = p_ma_tkgd, "MaTyGia" = p_ma_ty_gia, "MaLoaiLenh" = p_ma_loai_lenh, "MaTrangThaiLenh" = p_ma_trang_thai_lenh where "MaLenh" = p_ma_lenh
				returning "Lenh"."MaLenh" into MA_LENH;
				
				if p_ma_loai_lenh = MA_LOAI_LENH_MUA then
					--2.1. Cập nhật số dư tài khoản giao dịch
					update "TaiKhoanGiaoDich" set "SoDu" = "SoDu" - p_gia*p_khoi_luong where "MaTKGD" = p_ma_tkgd;
					
					--2.2. Thêm tỷ giá vào bảng SoHuu
					insert into "SoHuu"("MaTKNDT", "MaTyGia", "KhoiLuong") values((select "MaTKNDT" from "TaiKhoanGiaoDich" where "MaTKGD" = p_ma_tkgd), p_ma_ty_gia, p_khoi_luong)
					ON CONFLICT ("MaTKNDT", "MaTyGia") DO UPDATE 
						SET "KhoiLuong" = "SoHuu"."KhoiLuong" + p_khoi_luong;
					
				elsif p_ma_loai_lenh = MA_LOAI_LENH_BAN then
					--3.1 Cập nhật số dư tài khoản giao dịch
					update "TaiKhoanGiaoDich" set "SoDu" = "SoDu" + p_gia*p_khoi_luong where "MaTKGD" = p_ma_tkgd;
					
					--3.2 Thêm tỷ giá vào bảng SoHuu
					update "SoHuu" set "KhoiLuong" = "KhoiLuong" - p_khoi_luong where "MaTKNDT" = (select "MaTKNDT" from "TaiKhoanGiaoDich" where "MaTKGD" = p_ma_tkgd) and "MaTyGia" = p_ma_ty_gia;
				end if;
				
				--4. Thêm vào bảng LS_Lenh
				insert into "LS_Lenh"("KhoiLuong", "Gia", "GhiChu", "MaTKNVThucHien", "MaTKGD", "MaTyGia", "MaLoaiLenh", "MaTrangThaiLenh", "MaLenh") 
				values(p_khoi_luong, p_gia, 'Nhân viên khớp lệnh', MA_TK_NGUOI_CAP_NHAT, p_ma_tkgd, p_ma_ty_gia, p_ma_loai_lenh, p_ma_trang_thai_lenh, MA_LENH);
				
			else
				update "Lenh" set "KhoiLuong" = p_khoi_luong, "Gia" = p_gia, "GhiChu" = p_ghi_chu, "MaTKGD" = p_ma_tkgd, "MaTyGia" = p_ma_ty_gia, "MaLoaiLenh" = p_ma_loai_lenh, "MaTrangThaiLenh" = p_ma_trang_thai_lenh where "MaLenh" = p_ma_lenh
				returning "Lenh"."MaLenh" into MA_LENH;
			
				insert into "LS_Lenh"("KhoiLuong", "Gia", "GhiChu", "MaTKNVThucHien", "MaTKGD", "MaTyGia", "MaLoaiLenh", "MaTrangThaiLenh", "MaLenh") 
				values(p_khoi_luong, p_gia, 'Nhân viên cập nhật lệnh', MA_TK_NGUOI_CAP_NHAT, p_ma_tkgd, p_ma_ty_gia, p_ma_loai_lenh, p_ma_trang_thai_lenh, MA_LENH);
			end if;
		
		else
			p_status_code := 400;
			p_status_msg := 'Tên đăng nhập không tồn tại hoặc đã bị khóa!';
		end if;
	end if;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 8  DROP FUNCTION public.fn_update_offer(p_ten_dang_nhap character varying, p_ma_lenh integer, p_khoi_luong integer, p_gia real, p_ghi_chu character varying, p_ma_tkgd integer, p_ma_ty_gia integer, p_ma_loai_lenh integer, p_ma_trang_thai_lenh integer, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    21943 '   fn_update_role_claim(character varying)    FUNCTION     H  CREATE FUNCTION public.fn_update_role_claim(p_lstroleclaim character varying, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
declare
	item json;
	isSelect bool;
	isInsert bool;
	isUpdate bool;
	isDelete bool; 
	MA_NHOM_QUYEN int4;
	MA_QUYEN int4;
begin
	p_status_code := 200;
	p_status_msg := 'OK';
	
	if(is_json(p_lstroleclaim)) then
		for item in select * from json_array_elements_text(p_lstRoleClaim::json) loop
			MA_NHOM_QUYEN := item::json -> 'MaNhomQuyen';
			MA_QUYEN := item::json -> 'MaQuyen';
			isSelect := item::json->'Xem';
			isInsert := item::json->'Them';
			isUpdate := item::json->'Sua';
			isDelete := item::json->'Xoa';
			raise notice '%',item;
			
			INSERT INTO "CT_Quyen" ("MaNhomQuyen", "MaQuyen", "Xem", "Them", "Sua", "Xoa", "TrangThai") 
			VALUES (MA_NHOM_QUYEN, MA_QUYEN, isSelect, isInsert, isUpdate, isDelete, true)
			ON CONFLICT ("MaNhomQuyen", "MaQuyen") DO UPDATE 
				SET "Xem" = isSelect, 
						"Them" = isInsert,
						"Sua" = isUpdate,
						"Xoa" = isDelete;
					end loop;
	
	else
		p_status_code := 400;
		p_status_msg := 'Dữ liệu phải là một mảng object kiểu JSON [{}, {}].';
	end if;

	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
END
$$;
 �   DROP FUNCTION public.fn_update_role_claim(p_lstroleclaim character varying, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false                       1255    28399 {   fn_withdrawal(character varying, integer, real, character varying, character varying, character varying, character varying)    FUNCTION     �  CREATE FUNCTION public.fn_withdrawal(p_username character varying, p_ma_tkgd integer, p_so_tien real, p_ten_chu_the character varying, p_so_tknh character varying, p_ten_ngan_hang character varying, p_ten_chi_nhanh_ngan_hang character varying, OUT p_status_code integer, OUT p_status_msg character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
begin 
	p_status_code := 200;
	p_status_msg := 'Ok';
	
	if (select "SoDu" from "TaiKhoanGiaoDich" where "MaTKGD" = p_ma_tkgd) < p_so_tien then
		p_status_code := 200;
		p_status_msg := 'Vuợt quá số dư có trong tài khoản!';
	else
		update "TaiKhoanGiaoDich" set "SoDu" = "SoDu" - p_so_tien where "MaTKGD" = p_ma_tkgd;
		
		insert into "BienDongSoDu" ("ThoiGian", "LoaiBienDong", "SoTienBienDong", "LyDo", "MaTKGD", "NguoiThucHien", "TenChuThe", "SoTKNH", "TenNganHang", "TenChiNhanh")
		values (timezone('utc'::text, now()), false, p_so_tien, 'Rút tiền khỏi tài khoản', p_ma_tkgd, p_username, p_ten_chu_the, p_so_tknh, p_ten_ngan_hang, p_ten_chi_nhanh_ngan_hang);
	end if;
	
	exception when others then
		p_status_code := 500;
		RAISE exception '% %', SQLERRM, SQLSTATE;
end
$$;
 2  DROP FUNCTION public.fn_withdrawal(p_username character varying, p_ma_tkgd integer, p_so_tien real, p_ten_chu_the character varying, p_so_tknh character varying, p_ten_ngan_hang character varying, p_ten_chi_nhanh_ngan_hang character varying, OUT p_status_code integer, OUT p_status_msg character varying);
       public          postgres    false            �            1255    21947    is_json(character varying)    FUNCTION     -  CREATE FUNCTION public.is_json(input_text character varying) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
  DECLARE
    maybe_json jsonb;
  BEGIN
    BEGIN
      maybe_json := input_text;
    EXCEPTION WHEN others THEN
      RETURN FALSE;
    END;

    RETURN TRUE;
  END;
$$;
 <   DROP FUNCTION public.is_json(input_text character varying);
       public          postgres    false            �            1259    21740    BienDongSoDu    TABLE     U  CREATE TABLE public."BienDongSoDu" (
    "MaBienDongSoDu" integer NOT NULL,
    "ThoiGian" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "LoaiBienDong" boolean NOT NULL,
    "SoTienBienDong" real NOT NULL,
    "LyDo" character varying(255) NOT NULL,
    "GhiChu" character varying(255),
    "MaTKGD" integer NOT NULL,
    "NguoiThucHien" character varying(50) NOT NULL,
    "TenChuThe" character varying(50) NOT NULL,
    "SoTKNH" character varying(50) NOT NULL,
    "TenNganHang" character varying(255) NOT NULL,
    "TenChiNhanh" character varying(255) NOT NULL
);
 "   DROP TABLE public."BienDongSoDu";
       public         heap    postgres    false            �            1259    28384    BienDongSoDu_MaBienDongSoDu_seq    SEQUENCE     �   ALTER TABLE public."BienDongSoDu" ALTER COLUMN "MaBienDongSoDu" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."BienDongSoDu_MaBienDongSoDu_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            �            1259    21726    CT_Quyen    TABLE     W  CREATE TABLE public."CT_Quyen" (
    "MaNhomQuyen" integer NOT NULL,
    "MaQuyen" integer NOT NULL,
    "Xem" boolean DEFAULT false NOT NULL,
    "Them" boolean DEFAULT false NOT NULL,
    "Sua" boolean DEFAULT false NOT NULL,
    "Xoa" boolean DEFAULT false NOT NULL,
    "TrangThai" boolean NOT NULL,
    "GhiChu" character varying(255)
);
    DROP TABLE public."CT_Quyen";
       public         heap    postgres    false            �            1259    21705    ChucNang    TABLE     �   CREATE TABLE public."ChucNang" (
    "MaChucNang" integer NOT NULL,
    "TenChucNang" character varying(50) NOT NULL,
    "TrangThai" boolean NOT NULL,
    "DuongDan" character varying(255) NOT NULL,
    "GhiChu" character varying(255)
);
    DROP TABLE public."ChucNang";
       public         heap    postgres    false            �            1259    21777    LS_Lenh    TABLE     �  CREATE TABLE public."LS_Lenh" (
    "MaLSLenh" integer NOT NULL,
    "MaTKGD" integer NOT NULL,
    "MaTyGia" integer NOT NULL,
    "MaLoaiLenh" integer NOT NULL,
    "MaTrangThaiLenh" integer NOT NULL,
    "KhoiLuong" smallint NOT NULL,
    "Gia" real NOT NULL,
    "ThoiGianThucHien" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "MaTKNVThucHien" integer,
    "GhiChu" character varying(255),
    "MaLenh" integer NOT NULL,
    "MaTKNDTThucHien" integer
);
    DROP TABLE public."LS_Lenh";
       public         heap    postgres    false            �            1259    21923    LS_Lenh_MaLSLenh_seq    SEQUENCE     �   ALTER TABLE public."LS_Lenh" ALTER COLUMN "MaLSLenh" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."LS_Lenh_MaLSLenh_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    21767    LS_TyGia    TABLE     �   CREATE TABLE public."LS_TyGia" (
    "MaTyGia" integer NOT NULL,
    "Ngay" date NOT NULL,
    "GiaMua" real NOT NULL,
    "GiaBan" real NOT NULL
);
    DROP TABLE public."LS_TyGia";
       public         heap    postgres    false            �            1259    21751    Lenh    TABLE       CREATE TABLE public."Lenh" (
    "MaLenh" integer NOT NULL,
    "KhoiLuong" integer NOT NULL,
    "Gia" real NOT NULL,
    "ThoiGianDatLenh" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "ThoiGianKhopLenh" timestamp with time zone,
    "GhiChu" character varying(255),
    "MaTKNDTDat" integer,
    "MaTKNVDat" integer,
    "MaTKNVKhop" integer,
    "MaTKGD" integer NOT NULL,
    "MaTyGia" integer NOT NULL,
    "MaLoaiLenh" integer NOT NULL,
    "MaTrangThaiLenh" integer NOT NULL
);
    DROP TABLE public."Lenh";
       public         heap    postgres    false            �            1259    21921    Lenh_MaLenh_seq    SEQUENCE     �   ALTER TABLE public."Lenh" ALTER COLUMN "MaLenh" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Lenh_MaLenh_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    21783    LoaiLenh    TABLE     �   CREATE TABLE public."LoaiLenh" (
    "MaLoaiLenh" integer NOT NULL,
    "TenLoaiLenh" character varying(50) NOT NULL,
    "GhiChu" character varying(255),
    "TrangThai" boolean NOT NULL
);
    DROP TABLE public."LoaiLenh";
       public         heap    postgres    false            �            1259    21674    NhaDauTu    TABLE     �  CREATE TABLE public."NhaDauTu" (
    "MaNDT" integer NOT NULL,
    "Ho" character varying(50),
    "Ten" character varying(50) NOT NULL,
    "GioiTinh" boolean NOT NULL,
    "Email" character varying(50) NOT NULL,
    "SDT" character varying(20) NOT NULL,
    "CMND" character varying(20) NOT NULL,
    "NgayCap" date NOT NULL,
    "NoiCap" character varying(50) NOT NULL,
    "DiaChi" character varying(255) NOT NULL,
    "GhiChu" character varying(255)
);
    DROP TABLE public."NhaDauTu";
       public         heap    postgres    false            �            1259    21931    NhaDauTu_MaNDT_seq    SEQUENCE     �   ALTER TABLE public."NhaDauTu" ALTER COLUMN "MaNDT" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."NhaDauTu_MaNDT_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    202            �            1259    21682    NhanVien    TABLE     �  CREATE TABLE public."NhanVien" (
    "MaNV" integer NOT NULL,
    "Ho" character varying(50),
    "Ten" character varying(50) NOT NULL,
    "GioiTinh" boolean NOT NULL,
    "Email" character varying(50) NOT NULL,
    "SDT" character varying(20) NOT NULL,
    "CMND" character varying(20) NOT NULL,
    "NgayCap" date NOT NULL,
    "NoiCap" character varying(50) NOT NULL,
    "DiaChi" character varying(255) NOT NULL,
    "GhiChu" character varying(255)
);
    DROP TABLE public."NhanVien";
       public         heap    postgres    false            �            1259    21938    NhanVien_MaNV_seq    SEQUENCE     �   ALTER TABLE public."NhanVien" ALTER COLUMN "MaNV" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."NhanVien_MaNV_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    203            �            1259    21721 	   NhomQuyen    TABLE     �   CREATE TABLE public."NhomQuyen" (
    "MaNhomQuyen" integer NOT NULL,
    "TenNhomQuyen" character varying(50) NOT NULL,
    "TrangThai" boolean NOT NULL,
    "GhiChu" character varying(255)
);
    DROP TABLE public."NhomQuyen";
       public         heap    postgres    false            �            1259    21940    NhomQuyen_MaNhomQuyen_seq    SEQUENCE     �   ALTER TABLE public."NhomQuyen" ALTER COLUMN "MaNhomQuyen" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."NhomQuyen_MaNhomQuyen_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209            �            1259    21713    Quyen    TABLE     	  CREATE TABLE public."Quyen" (
    "MaQuyen" integer NOT NULL,
    "TenQuyen" character varying(50) NOT NULL,
    "TrangThai" boolean NOT NULL,
    "DuongDan" character varying(255) NOT NULL,
    "GhiChu" character varying(255),
    "MaChucNang" integer NOT NULL
);
    DROP TABLE public."Quyen";
       public         heap    postgres    false            �            1259    21772    SoHuu    TABLE     �   CREATE TABLE public."SoHuu" (
    "MaTKNDT" integer NOT NULL,
    "MaTyGia" integer NOT NULL,
    "KhoiLuong" integer NOT NULL,
    "GhiChu" character varying(255)
);
    DROP TABLE public."SoHuu";
       public         heap    postgres    false            �            1259    21735    TaiKhoanGiaoDich    TABLE     �   CREATE TABLE public."TaiKhoanGiaoDich" (
    "MaTKGD" integer NOT NULL,
    "SoDu" real NOT NULL,
    "TrangThai" boolean NOT NULL,
    "MaTKNDT" integer NOT NULL
);
 &   DROP TABLE public."TaiKhoanGiaoDich";
       public         heap    postgres    false            �            1259    28429    TaiKhoanGiaoDich_MaTKGD_seq    SEQUENCE     �   ALTER TABLE public."TaiKhoanGiaoDich" ALTER COLUMN "MaTKGD" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."TaiKhoanGiaoDich_MaTKGD_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999
    CACHE 1
);
            public          postgres    false    211            �            1259    21700    TaiKhoanNganHang    TABLE     �   CREATE TABLE public."TaiKhoanNganHang" (
    "SoTKNH" integer NOT NULL,
    "TenNganHang" character varying(50),
    "ChiNhanh" character varying(50),
    "MaNDT" integer NOT NULL
);
 &   DROP TABLE public."TaiKhoanNganHang";
       public         heap    postgres    false            �            1259    21690    TaiKhoanNhaDauTu    TABLE     4  CREATE TABLE public."TaiKhoanNhaDauTu" (
    "MaTKNDT" integer NOT NULL,
    "TenDangNhap" character varying(50) NOT NULL,
    "MatKhau" character varying(50) NOT NULL,
    "TrangThai" boolean NOT NULL,
    "GhiChu" character varying(255),
    "MaNDT" integer NOT NULL,
    "MaNhomQuyen" integer NOT NULL
);
 &   DROP TABLE public."TaiKhoanNhaDauTu";
       public         heap    postgres    false            �            1259    21933    TaiKhoanNhaDauTu_MaTKNDT_seq    SEQUENCE     �   ALTER TABLE public."TaiKhoanNhaDauTu" ALTER COLUMN "MaTKNDT" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."TaiKhoanNhaDauTu_MaTKNDT_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    204            �            1259    21695    TaiKhoanNhanVien    TABLE     2  CREATE TABLE public."TaiKhoanNhanVien" (
    "MaTKNV" integer NOT NULL,
    "TenDangNhap" character varying(50) NOT NULL,
    "MatKhau" character varying(50) NOT NULL,
    "TrangThai" boolean NOT NULL,
    "GhiChu" character varying(255),
    "MaNV" integer NOT NULL,
    "MaNhomQuyen" integer NOT NULL
);
 &   DROP TABLE public."TaiKhoanNhanVien";
       public         heap    postgres    false            �            1259    21936    TaiKhoanNhanVien_MaTKNV_seq    SEQUENCE     �   ALTER TABLE public."TaiKhoanNhanVien" ALTER COLUMN "MaTKNV" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."TaiKhoanNhanVien_MaTKNV_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    205            �            1259    21757    TienTe    TABLE     �   CREATE TABLE public."TienTe" (
    "MaTienTe" character varying(10) NOT NULL,
    "TenTienTe" character varying(50) NOT NULL,
    "TrangThai" boolean NOT NULL,
    "QuocGia" character varying(50),
    "GhiChu" character varying(255)
);
    DROP TABLE public."TienTe";
       public         heap    postgres    false            �            1259    21746    TrangThaiLenh    TABLE     �   CREATE TABLE public."TrangThaiLenh" (
    "MaTrangThaiLenh" integer NOT NULL,
    "TenTrangThaiLenh" character varying(50) NOT NULL,
    "TrangThai" boolean NOT NULL,
    "GhiChu" character varying(255)
);
 #   DROP TABLE public."TrangThaiLenh";
       public         heap    postgres    false            �            1259    21762    TyGia    TABLE     �   CREATE TABLE public."TyGia" (
    "MaTyGia" integer NOT NULL,
    "MaDongTienYetGia" character varying(10) NOT NULL,
    "MaDongTienDinhGia" character varying(10) NOT NULL,
    "TrangThai" boolean NOT NULL
);
    DROP TABLE public."TyGia";
       public         heap    postgres    false            �          0    21740    BienDongSoDu 
   TABLE DATA           �   COPY public."BienDongSoDu" ("MaBienDongSoDu", "ThoiGian", "LoaiBienDong", "SoTienBienDong", "LyDo", "GhiChu", "MaTKGD", "NguoiThucHien", "TenChuThe", "SoTKNH", "TenNganHang", "TenChiNhanh") FROM stdin;
    public          postgres    false    212   ��      �          0    21726    CT_Quyen 
   TABLE DATA           r   COPY public."CT_Quyen" ("MaNhomQuyen", "MaQuyen", "Xem", "Them", "Sua", "Xoa", "TrangThai", "GhiChu") FROM stdin;
    public          postgres    false    210   �      �          0    21705    ChucNang 
   TABLE DATA           d   COPY public."ChucNang" ("MaChucNang", "TenChucNang", "TrangThai", "DuongDan", "GhiChu") FROM stdin;
    public          postgres    false    207   ��      �          0    21777    LS_Lenh 
   TABLE DATA           �   COPY public."LS_Lenh" ("MaLSLenh", "MaTKGD", "MaTyGia", "MaLoaiLenh", "MaTrangThaiLenh", "KhoiLuong", "Gia", "ThoiGianThucHien", "MaTKNVThucHien", "GhiChu", "MaLenh", "MaTKNDTThucHien") FROM stdin;
    public          postgres    false    219   W�      �          0    21767    LS_TyGia 
   TABLE DATA           K   COPY public."LS_TyGia" ("MaTyGia", "Ngay", "GiaMua", "GiaBan") FROM stdin;
    public          postgres    false    217   Ɍ      �          0    21751    Lenh 
   TABLE DATA           �   COPY public."Lenh" ("MaLenh", "KhoiLuong", "Gia", "ThoiGianDatLenh", "ThoiGianKhopLenh", "GhiChu", "MaTKNDTDat", "MaTKNVDat", "MaTKNVKhop", "MaTKGD", "MaTyGia", "MaLoaiLenh", "MaTrangThaiLenh") FROM stdin;
    public          postgres    false    214   �      �          0    21783    LoaiLenh 
   TABLE DATA           X   COPY public."LoaiLenh" ("MaLoaiLenh", "TenLoaiLenh", "GhiChu", "TrangThai") FROM stdin;
    public          postgres    false    220   ��      �          0    21674    NhaDauTu 
   TABLE DATA           �   COPY public."NhaDauTu" ("MaNDT", "Ho", "Ten", "GioiTinh", "Email", "SDT", "CMND", "NgayCap", "NoiCap", "DiaChi", "GhiChu") FROM stdin;
    public          postgres    false    202   �      �          0    21682    NhanVien 
   TABLE DATA           �   COPY public."NhanVien" ("MaNV", "Ho", "Ten", "GioiTinh", "Email", "SDT", "CMND", "NgayCap", "NoiCap", "DiaChi", "GhiChu") FROM stdin;
    public          postgres    false    203   &�      �          0    21721 	   NhomQuyen 
   TABLE DATA           [   COPY public."NhomQuyen" ("MaNhomQuyen", "TenNhomQuyen", "TrangThai", "GhiChu") FROM stdin;
    public          postgres    false    209   6�      �          0    21713    Quyen 
   TABLE DATA           i   COPY public."Quyen" ("MaQuyen", "TenQuyen", "TrangThai", "DuongDan", "GhiChu", "MaChucNang") FROM stdin;
    public          postgres    false    208   x�      �          0    21772    SoHuu 
   TABLE DATA           N   COPY public."SoHuu" ("MaTKNDT", "MaTyGia", "KhoiLuong", "GhiChu") FROM stdin;
    public          postgres    false    218   ˔      �          0    21735    TaiKhoanGiaoDich 
   TABLE DATA           V   COPY public."TaiKhoanGiaoDich" ("MaTKGD", "SoDu", "TrangThai", "MaTKNDT") FROM stdin;
    public          postgres    false    211   �      �          0    21700    TaiKhoanNganHang 
   TABLE DATA           Z   COPY public."TaiKhoanNganHang" ("SoTKNH", "TenNganHang", "ChiNhanh", "MaNDT") FROM stdin;
    public          postgres    false    206   Z�      �          0    21690    TaiKhoanNhaDauTu 
   TABLE DATA           �   COPY public."TaiKhoanNhaDauTu" ("MaTKNDT", "TenDangNhap", "MatKhau", "TrangThai", "GhiChu", "MaNDT", "MaNhomQuyen") FROM stdin;
    public          postgres    false    204   w�      �          0    21695    TaiKhoanNhanVien 
   TABLE DATA           ~   COPY public."TaiKhoanNhanVien" ("MaTKNV", "TenDangNhap", "MatKhau", "TrangThai", "GhiChu", "MaNV", "MaNhomQuyen") FROM stdin;
    public          postgres    false    205   ϕ      �          0    21757    TienTe 
   TABLE DATA           ]   COPY public."TienTe" ("MaTienTe", "TenTienTe", "TrangThai", "QuocGia", "GhiChu") FROM stdin;
    public          postgres    false    215   5�      �          0    21746    TrangThaiLenh 
   TABLE DATA           g   COPY public."TrangThaiLenh" ("MaTrangThaiLenh", "TenTrangThaiLenh", "TrangThai", "GhiChu") FROM stdin;
    public          postgres    false    213   ��      �          0    21762    TyGia 
   TABLE DATA           b   COPY public."TyGia" ("MaTyGia", "MaDongTienYetGia", "MaDongTienDinhGia", "TrangThai") FROM stdin;
    public          postgres    false    216   і      �           0    0    BienDongSoDu_MaBienDongSoDu_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."BienDongSoDu_MaBienDongSoDu_seq"', 17, true);
          public          postgres    false    228            �           0    0    LS_Lenh_MaLSLenh_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."LS_Lenh_MaLSLenh_seq"', 202, true);
          public          postgres    false    222            �           0    0    Lenh_MaLenh_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Lenh_MaLenh_seq"', 78, true);
          public          postgres    false    221            �           0    0    NhaDauTu_MaNDT_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."NhaDauTu_MaNDT_seq"', 19, true);
          public          postgres    false    223            �           0    0    NhanVien_MaNV_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."NhanVien_MaNV_seq"', 21, true);
          public          postgres    false    226            �           0    0    NhomQuyen_MaNhomQuyen_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."NhomQuyen_MaNhomQuyen_seq"', 14, true);
          public          postgres    false    227            �           0    0    TaiKhoanGiaoDich_MaTKGD_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."TaiKhoanGiaoDich_MaTKGD_seq"', 100000002, true);
          public          postgres    false    229            �           0    0    TaiKhoanNhaDauTu_MaTKNDT_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."TaiKhoanNhaDauTu_MaTKNDT_seq"', 18, true);
          public          postgres    false    224            �           0    0    TaiKhoanNhanVien_MaTKNV_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."TaiKhoanNhanVien_MaTKNV_seq"', 9, true);
          public          postgres    false    225                       2606    21745    BienDongSoDu BienDongSoDu_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."BienDongSoDu"
    ADD CONSTRAINT "BienDongSoDu_pkey" PRIMARY KEY ("MaBienDongSoDu");
 L   ALTER TABLE ONLY public."BienDongSoDu" DROP CONSTRAINT "BienDongSoDu_pkey";
       public            postgres    false    212                       2606    21734    CT_Quyen CT_Quyen_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."CT_Quyen"
    ADD CONSTRAINT "CT_Quyen_pkey" PRIMARY KEY ("MaNhomQuyen", "MaQuyen");
 D   ALTER TABLE ONLY public."CT_Quyen" DROP CONSTRAINT "CT_Quyen_pkey";
       public            postgres    false    210    210                       2606    21712    ChucNang ChucNang_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."ChucNang"
    ADD CONSTRAINT "ChucNang_pkey" PRIMARY KEY ("MaChucNang");
 D   ALTER TABLE ONLY public."ChucNang" DROP CONSTRAINT "ChucNang_pkey";
       public            postgres    false    207            *           2606    21782    LS_Lenh LS_Lenh_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."LS_Lenh"
    ADD CONSTRAINT "LS_Lenh_pkey" PRIMARY KEY ("MaLSLenh");
 B   ALTER TABLE ONLY public."LS_Lenh" DROP CONSTRAINT "LS_Lenh_pkey";
       public            postgres    false    219            &           2606    21771    LS_TyGia LS_TyGia_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public."LS_TyGia"
    ADD CONSTRAINT "LS_TyGia_pkey" PRIMARY KEY ("MaTyGia", "Ngay");
 D   ALTER TABLE ONLY public."LS_TyGia" DROP CONSTRAINT "LS_TyGia_pkey";
       public            postgres    false    217    217                        2606    21756    Lenh Lenh_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Lenh"
    ADD CONSTRAINT "Lenh_pkey" PRIMARY KEY ("MaLenh");
 <   ALTER TABLE ONLY public."Lenh" DROP CONSTRAINT "Lenh_pkey";
       public            postgres    false    214            ,           2606    21787    LoaiLenh LoaiLenh_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."LoaiLenh"
    ADD CONSTRAINT "LoaiLenh_pkey" PRIMARY KEY ("MaLoaiLenh");
 D   ALTER TABLE ONLY public."LoaiLenh" DROP CONSTRAINT "LoaiLenh_pkey";
       public            postgres    false    220                       2606    21681    NhaDauTu NhaDauTu_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."NhaDauTu"
    ADD CONSTRAINT "NhaDauTu_pkey" PRIMARY KEY ("MaNDT");
 D   ALTER TABLE ONLY public."NhaDauTu" DROP CONSTRAINT "NhaDauTu_pkey";
       public            postgres    false    202                       2606    21689    NhanVien NhanVien_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."NhanVien"
    ADD CONSTRAINT "NhanVien_pkey" PRIMARY KEY ("MaNV");
 D   ALTER TABLE ONLY public."NhanVien" DROP CONSTRAINT "NhanVien_pkey";
       public            postgres    false    203                       2606    21725    NhomQuyen NhomQuyen_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."NhomQuyen"
    ADD CONSTRAINT "NhomQuyen_pkey" PRIMARY KEY ("MaNhomQuyen");
 F   ALTER TABLE ONLY public."NhomQuyen" DROP CONSTRAINT "NhomQuyen_pkey";
       public            postgres    false    209                       2606    21720    Quyen Quyen_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Quyen"
    ADD CONSTRAINT "Quyen_pkey" PRIMARY KEY ("MaQuyen");
 >   ALTER TABLE ONLY public."Quyen" DROP CONSTRAINT "Quyen_pkey";
       public            postgres    false    208            (           2606    28383    SoHuu SoHuu_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SoHuu"
    ADD CONSTRAINT "SoHuu_pkey" PRIMARY KEY ("MaTKNDT", "MaTyGia");
 >   ALTER TABLE ONLY public."SoHuu" DROP CONSTRAINT "SoHuu_pkey";
       public            postgres    false    218    218                       2606    21739 &   TaiKhoanGiaoDich TaiKhoanGiaoDich_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."TaiKhoanGiaoDich"
    ADD CONSTRAINT "TaiKhoanGiaoDich_pkey" PRIMARY KEY ("MaTKGD");
 T   ALTER TABLE ONLY public."TaiKhoanGiaoDich" DROP CONSTRAINT "TaiKhoanGiaoDich_pkey";
       public            postgres    false    211                       2606    21704 &   TaiKhoanNganHang TaiKhoanNganHang_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."TaiKhoanNganHang"
    ADD CONSTRAINT "TaiKhoanNganHang_pkey" PRIMARY KEY ("SoTKNH");
 T   ALTER TABLE ONLY public."TaiKhoanNganHang" DROP CONSTRAINT "TaiKhoanNganHang_pkey";
       public            postgres    false    206            
           2606    21694 &   TaiKhoanNhaDauTu TaiKhoanNhaDauTu_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public."TaiKhoanNhaDauTu"
    ADD CONSTRAINT "TaiKhoanNhaDauTu_pkey" PRIMARY KEY ("MaTKNDT");
 T   ALTER TABLE ONLY public."TaiKhoanNhaDauTu" DROP CONSTRAINT "TaiKhoanNhaDauTu_pkey";
       public            postgres    false    204                       2606    21699 &   TaiKhoanNhanVien TaiKhoanNhanVien_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."TaiKhoanNhanVien"
    ADD CONSTRAINT "TaiKhoanNhanVien_pkey" PRIMARY KEY ("MaTKNV");
 T   ALTER TABLE ONLY public."TaiKhoanNhanVien" DROP CONSTRAINT "TaiKhoanNhanVien_pkey";
       public            postgres    false    205            "           2606    21761    TienTe TienTe_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."TienTe"
    ADD CONSTRAINT "TienTe_pkey" PRIMARY KEY ("MaTienTe");
 @   ALTER TABLE ONLY public."TienTe" DROP CONSTRAINT "TienTe_pkey";
       public            postgres    false    215                       2606    21750     TrangThaiLenh TrangThaiLenh_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."TrangThaiLenh"
    ADD CONSTRAINT "TrangThaiLenh_pkey" PRIMARY KEY ("MaTrangThaiLenh");
 N   ALTER TABLE ONLY public."TrangThaiLenh" DROP CONSTRAINT "TrangThaiLenh_pkey";
       public            postgres    false    213            $           2606    21766    TyGia TyGia_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."TyGia"
    ADD CONSTRAINT "TyGia_pkey" PRIMARY KEY ("MaTyGia");
 >   ALTER TABLE ONLY public."TyGia" DROP CONSTRAINT "TyGia_pkey";
       public            postgres    false    216                       2606    21930    NhaDauTu uk_cmnd 
   CONSTRAINT     O   ALTER TABLE ONLY public."NhaDauTu"
    ADD CONSTRAINT uk_cmnd UNIQUE ("CMND");
 <   ALTER TABLE ONLY public."NhaDauTu" DROP CONSTRAINT uk_cmnd;
       public            postgres    false    202                       2606    21911    NhomQuyen uk_tennhomquyen 
   CONSTRAINT     `   ALTER TABLE ONLY public."NhomQuyen"
    ADD CONSTRAINT uk_tennhomquyen UNIQUE ("TenNhomQuyen");
 E   ALTER TABLE ONLY public."NhomQuyen" DROP CONSTRAINT uk_tennhomquyen;
       public            postgres    false    209            6           2606    21828 /   BienDongSoDu fk_BienDongSoDu_TaiKhoanGiaoDich_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."BienDongSoDu"
    ADD CONSTRAINT "fk_BienDongSoDu_TaiKhoanGiaoDich_1" FOREIGN KEY ("MaTKGD") REFERENCES public."TaiKhoanGiaoDich"("MaTKGD") ON UPDATE CASCADE;
 ]   ALTER TABLE ONLY public."BienDongSoDu" DROP CONSTRAINT "fk_BienDongSoDu_TaiKhoanGiaoDich_1";
       public          postgres    false    2842    211    212            C           2606    21858    LS_Lenh fk_CT_Lenh_Lenh_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."LS_Lenh"
    ADD CONSTRAINT "fk_CT_Lenh_Lenh_1" FOREIGN KEY ("MaLenh") REFERENCES public."Lenh"("MaLenh");
 G   ALTER TABLE ONLY public."LS_Lenh" DROP CONSTRAINT "fk_CT_Lenh_Lenh_1";
       public          postgres    false    214    219    2848            4           2606    21950     CT_Quyen fk_CT_Quyen_NhomQuyen_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."CT_Quyen"
    ADD CONSTRAINT "fk_CT_Quyen_NhomQuyen_1" FOREIGN KEY ("MaNhomQuyen") REFERENCES public."NhomQuyen"("MaNhomQuyen") ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."CT_Quyen" DROP CONSTRAINT "fk_CT_Quyen_NhomQuyen_1";
       public          postgres    false    2836    209    210            3           2606    21788    CT_Quyen fk_CT_Quyen_Quyen_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."CT_Quyen"
    ADD CONSTRAINT "fk_CT_Quyen_Quyen_1" FOREIGN KEY ("MaQuyen") REFERENCES public."Quyen"("MaQuyen") ON UPDATE CASCADE;
 J   ALTER TABLE ONLY public."CT_Quyen" DROP CONSTRAINT "fk_CT_Quyen_Quyen_1";
       public          postgres    false    208    2834    210            @           2606    21843    LS_TyGia fk_LS_TyGia_TyGia_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."LS_TyGia"
    ADD CONSTRAINT "fk_LS_TyGia_TyGia_1" FOREIGN KEY ("MaTyGia") REFERENCES public."TyGia"("MaTyGia") ON UPDATE CASCADE;
 J   ALTER TABLE ONLY public."LS_TyGia" DROP CONSTRAINT "fk_LS_TyGia_TyGia_1";
       public          postgres    false    2852    216    217            <           2606    21893    Lenh fk_Lenh_LoaiLenh_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."Lenh"
    ADD CONSTRAINT "fk_Lenh_LoaiLenh_1" FOREIGN KEY ("MaLoaiLenh") REFERENCES public."LoaiLenh"("MaLoaiLenh") ON UPDATE CASCADE;
 E   ALTER TABLE ONLY public."Lenh" DROP CONSTRAINT "fk_Lenh_LoaiLenh_1";
       public          postgres    false    214    220    2860            :           2606    21883    Lenh fk_Lenh_TaiKhoanGiaoDich_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."Lenh"
    ADD CONSTRAINT "fk_Lenh_TaiKhoanGiaoDich_1" FOREIGN KEY ("MaTKGD") REFERENCES public."TaiKhoanGiaoDich"("MaTKGD") ON UPDATE CASCADE;
 M   ALTER TABLE ONLY public."Lenh" DROP CONSTRAINT "fk_Lenh_TaiKhoanGiaoDich_1";
       public          postgres    false    2842    214    211            7           2606    21863    Lenh fk_Lenh_TaiKhoanNhaDauTu_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."Lenh"
    ADD CONSTRAINT "fk_Lenh_TaiKhoanNhaDauTu_1" FOREIGN KEY ("MaTKNDTDat") REFERENCES public."TaiKhoanNhaDauTu"("MaTKNDT") ON UPDATE CASCADE;
 M   ALTER TABLE ONLY public."Lenh" DROP CONSTRAINT "fk_Lenh_TaiKhoanNhaDauTu_1";
       public          postgres    false    2826    204    214            8           2606    21868    Lenh fk_Lenh_TaiKhoanNhanVien_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."Lenh"
    ADD CONSTRAINT "fk_Lenh_TaiKhoanNhanVien_1" FOREIGN KEY ("MaTKNVDat") REFERENCES public."TaiKhoanNhanVien"("MaTKNV") ON UPDATE CASCADE;
 M   ALTER TABLE ONLY public."Lenh" DROP CONSTRAINT "fk_Lenh_TaiKhoanNhanVien_1";
       public          postgres    false    214    205    2828            9           2606    21873    Lenh fk_Lenh_TaiKhoanNhanVien_2    FK CONSTRAINT     �   ALTER TABLE ONLY public."Lenh"
    ADD CONSTRAINT "fk_Lenh_TaiKhoanNhanVien_2" FOREIGN KEY ("MaTKNVKhop") REFERENCES public."TaiKhoanNhanVien"("MaTKNV") ON UPDATE CASCADE;
 M   ALTER TABLE ONLY public."Lenh" DROP CONSTRAINT "fk_Lenh_TaiKhoanNhanVien_2";
       public          postgres    false    205    214    2828            =           2606    21898    Lenh fk_Lenh_TrangThaiLenh_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."Lenh"
    ADD CONSTRAINT "fk_Lenh_TrangThaiLenh_1" FOREIGN KEY ("MaTrangThaiLenh") REFERENCES public."TrangThaiLenh"("MaTrangThaiLenh") ON UPDATE CASCADE;
 J   ALTER TABLE ONLY public."Lenh" DROP CONSTRAINT "fk_Lenh_TrangThaiLenh_1";
       public          postgres    false    214    213    2846            ;           2606    21888    Lenh fk_Lenh_TyGia_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."Lenh"
    ADD CONSTRAINT "fk_Lenh_TyGia_1" FOREIGN KEY ("MaTyGia") REFERENCES public."TyGia"("MaTyGia") ON UPDATE CASCADE;
 B   ALTER TABLE ONLY public."Lenh" DROP CONSTRAINT "fk_Lenh_TyGia_1";
       public          postgres    false    216    2852    214            2           2606    21798    Quyen fk_Quyen_ChucNang_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."Quyen"
    ADD CONSTRAINT "fk_Quyen_ChucNang_1" FOREIGN KEY ("MaChucNang") REFERENCES public."ChucNang"("MaChucNang") ON UPDATE CASCADE;
 G   ALTER TABLE ONLY public."Quyen" DROP CONSTRAINT "fk_Quyen_ChucNang_1";
       public          postgres    false    207    208    2832            A           2606    21833 !   SoHuu fk_SoHuu_TaiKhoanNhaDauTu_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."SoHuu"
    ADD CONSTRAINT "fk_SoHuu_TaiKhoanNhaDauTu_1" FOREIGN KEY ("MaTKNDT") REFERENCES public."TaiKhoanNhaDauTu"("MaTKNDT") ON UPDATE CASCADE;
 O   ALTER TABLE ONLY public."SoHuu" DROP CONSTRAINT "fk_SoHuu_TaiKhoanNhaDauTu_1";
       public          postgres    false    2826    218    204            B           2606    21838    SoHuu fk_SoHuu_TyGia_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."SoHuu"
    ADD CONSTRAINT "fk_SoHuu_TyGia_1" FOREIGN KEY ("MaTyGia") REFERENCES public."TyGia"("MaTyGia") ON UPDATE CASCADE;
 D   ALTER TABLE ONLY public."SoHuu" DROP CONSTRAINT "fk_SoHuu_TyGia_1";
       public          postgres    false    2852    218    216            5           2606    21878 7   TaiKhoanGiaoDich fk_TaiKhoanGiaoDich_TaiKhoanNhaDauTu_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."TaiKhoanGiaoDich"
    ADD CONSTRAINT "fk_TaiKhoanGiaoDich_TaiKhoanNhaDauTu_1" FOREIGN KEY ("MaTKNDT") REFERENCES public."TaiKhoanNhaDauTu"("MaTKNDT") ON UPDATE CASCADE;
 e   ALTER TABLE ONLY public."TaiKhoanGiaoDich" DROP CONSTRAINT "fk_TaiKhoanGiaoDich_TaiKhoanNhaDauTu_1";
       public          postgres    false    2826    211    204            1           2606    21823 /   TaiKhoanNganHang fk_TaiKhoanNganHang_NhaDauTu_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."TaiKhoanNganHang"
    ADD CONSTRAINT "fk_TaiKhoanNganHang_NhaDauTu_1" FOREIGN KEY ("MaNDT") REFERENCES public."NhaDauTu"("MaNDT") ON UPDATE CASCADE;
 ]   ALTER TABLE ONLY public."TaiKhoanNganHang" DROP CONSTRAINT "fk_TaiKhoanNganHang_NhaDauTu_1";
       public          postgres    false    202    206    2820            .           2606    21818 /   TaiKhoanNhaDauTu fk_TaiKhoanNhaDauTu_NhaDauTu_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."TaiKhoanNhaDauTu"
    ADD CONSTRAINT "fk_TaiKhoanNhaDauTu_NhaDauTu_1" FOREIGN KEY ("MaNDT") REFERENCES public."NhaDauTu"("MaNDT") ON UPDATE CASCADE;
 ]   ALTER TABLE ONLY public."TaiKhoanNhaDauTu" DROP CONSTRAINT "fk_TaiKhoanNhaDauTu_NhaDauTu_1";
       public          postgres    false    2820    202    204            -           2606    21803 0   TaiKhoanNhaDauTu fk_TaiKhoanNhaDauTu_NhomQuyen_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."TaiKhoanNhaDauTu"
    ADD CONSTRAINT "fk_TaiKhoanNhaDauTu_NhomQuyen_1" FOREIGN KEY ("MaNhomQuyen") REFERENCES public."NhomQuyen"("MaNhomQuyen") ON UPDATE CASCADE;
 ^   ALTER TABLE ONLY public."TaiKhoanNhaDauTu" DROP CONSTRAINT "fk_TaiKhoanNhaDauTu_NhomQuyen_1";
       public          postgres    false    209    2836    204            0           2606    21813 /   TaiKhoanNhanVien fk_TaiKhoanNhanVien_NhanVien_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."TaiKhoanNhanVien"
    ADD CONSTRAINT "fk_TaiKhoanNhanVien_NhanVien_1" FOREIGN KEY ("MaNV") REFERENCES public."NhanVien"("MaNV") ON UPDATE CASCADE;
 ]   ALTER TABLE ONLY public."TaiKhoanNhanVien" DROP CONSTRAINT "fk_TaiKhoanNhanVien_NhanVien_1";
       public          postgres    false    205    203    2824            /           2606    21808 0   TaiKhoanNhanVien fk_TaiKhoanNhanVien_NhomQuyen_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."TaiKhoanNhanVien"
    ADD CONSTRAINT "fk_TaiKhoanNhanVien_NhomQuyen_1" FOREIGN KEY ("MaNhomQuyen") REFERENCES public."NhomQuyen"("MaNhomQuyen") ON UPDATE CASCADE;
 ^   ALTER TABLE ONLY public."TaiKhoanNhanVien" DROP CONSTRAINT "fk_TaiKhoanNhanVien_NhomQuyen_1";
       public          postgres    false    209    2836    205            >           2606    21848    TyGia fk_TyGia_TienTe_1    FK CONSTRAINT     �   ALTER TABLE ONLY public."TyGia"
    ADD CONSTRAINT "fk_TyGia_TienTe_1" FOREIGN KEY ("MaDongTienYetGia") REFERENCES public."TienTe"("MaTienTe") ON UPDATE CASCADE;
 E   ALTER TABLE ONLY public."TyGia" DROP CONSTRAINT "fk_TyGia_TienTe_1";
       public          postgres    false    2850    215    216            ?           2606    21853    TyGia fk_TyGia_TienTe_2    FK CONSTRAINT     �   ALTER TABLE ONLY public."TyGia"
    ADD CONSTRAINT "fk_TyGia_TienTe_2" FOREIGN KEY ("MaDongTienDinhGia") REFERENCES public."TienTe"("MaTienTe") ON UPDATE CASCADE;
 E   ALTER TABLE ONLY public."TyGia" DROP CONSTRAINT "fk_TyGia_TienTe_2";
       public          postgres    false    2850    216    215            �   s  x��һJA�z�)�Μ9s�r�uŀVi����`o+�>BķH��"�&�fc��Y��S|��X��P[Gy2�K��`�2�a��|N�t�<����[N��${O���"&P���v3|H��^^]��v���t��X���5�)��W
��� R	���eJ#�N�f�}���y�9(")^�KZ��;��D^ZN���f���+[��]>�y���
�������.wp��K��p ���
<J���i9�b���So._�n���.^�n ���K�M���Ǫ�{&��2z�L6N��qtؕ���.�:w��pn=�[a����a��f�Sփ�`�S��T,��,�G�7�A|Ȑg      �   �   x�m���0��0�))�� �N��Q-
��w�IQ���޿9���O��*�	�4���j���EMF�f�g\}�$�����> ��7�|
>�N�G7��lg�>�U�����n� 鯼��Th*���>vUO��p��?\�4      �   �   x�3��H�U(~�{�B����
%@rb^:g	�>g��g���kr�UH.�d*�^P	�6�t:�0_!H��L8}���e(�g&�+�<�ݝ��3�9� S!;#���y�Trz`q�Е���+�d�,S��8�(&���� ��JG      �   b  x���=n7�k�_��_r���	ܥQ��p��
�S�	�0 �]:�=|����?.)҂~ Axf4;3�K.�= �hL����˿�<� {Ax���m(A9��7P�����?^�~���׷�O��x��Ӈ_^?=p|x��!ߡ+|�f	Q�4]��?}��ۛ�����K;o@��,�TѸ�F1e�d�������~�o� ��E`ClY5O�r������7�� h��i-����0r�9W�^
2$K
3P��`Ǧ �bS)6r&�4J�>*�V�Mk��$�$m�i���4퓝WF�s.l�HYfi�&XEǍ�ۏ :���36����Y9a����lZ�>���>����d�d���J*��)y������ �\�,
��*���`:���M%$���y��b�>�HA0&��}�R�銆�}�%G^��#�]
�� �"O��$���h
I�z�s_���j�0�
��r|��4���1  �L�*=_ղ?:�vq�D�!7Yh^�Z�S4��c�g]u�W�R�谁�ڂG�%�,҆��-���^�M_W�2L�^�fr;�Ϥ-9�fsa;حh�v�	���q�R��༢���E���l��h�K�q���!H�]�Z�^���%�$���n�k��T���MӬ�ZuXڹ�HA[ 󿛶�ɖK�l��;�3��*Ģ�j��9Ĝ�'�M��:��ݭ�+�y&�Z�X:j�yG�XJr�4#W-��J�Cv���� ��ɑ�9[)01S�{7�Z�Ndo��M�R��ŮB�׉�K����T�O6]��dgS�B3�U)�=V����9��s��/���y"�3���RZۍ�7�,��c�zXm)�X2�B���iG�غ����QZeLSCf�S9Di�����ݱ��F*�QH��^uL׎��Υ�%F�	:V����5������H�M�GY��ބJ���.�.�Ǐ�(�ug�h|V)6F}���`�iz2>ѩ)�m��kq�Ӗ<
�t�l?dB�&t�ݢ�*��mI�eS�`��$uk^#���E�<B,WFu�b��Խ��SI>�xί�N��M��Iq���{+NӮ♸A�]Ў&�,S�;ٲ�*��s��+V;���u�[N,J��NA��rD�W�۟e/���0���Y�?����~�2��;�7�?�������sP�r�~������t{���M����๏/g��MQ𻏠�1��m���i\X��#ϜF�n�����\�ǽ(�ŷg��$��Ce�&e�=93����M���/}�G�`/�,��
�ko��RݽvU�˦��T����[b�����ڋ��˾I�(O�Ԝ�VR����,1�E����*����w��/����@��-Q��a�U�� &�>���d���^?!Ц1��xz���f\z������@����I�{k^��U�"{��y�U3/�^^�/�8sN��Un��(i?�����'��}W�P�����iW����3�w�D�7'�=�u�>�b�Їc�ީ
S��L�n�����7OM�;�N�|���E e�C,j��봽=�<�6h �k��b</��zx��iTv�����i�V���߹�8�d�=+�,Y��.}�������Ή      �      x������ � �      �   �  x��W[��8�NN���ķ�C�	���ؒ�,61�I7�D*t��H;?��/�s���/��C���������iK"�1��?���?5\�������� �^�����k��i�������P����O���Ѣ<�+����EE9��Z<��ͭ�o���-�4�K����J���{c3\�~!_K�n ��1����$MF�e}|�gu��@B#����&���}l�@Mz�Q��<�'I�������w�|�5�д^�y�����whgs�����xp��\�B�J���.���#���_L��΂ʥS||՚)	�-���!S|�)�E|�B|�M=��;y�>�l� n���,�>j�ec����-Z��:��=��_��]A5ꈅo�Uǂ�4����O�ɬ@����.�����| A�����������A�%�`��1��x����8h�P����C��K�$ӫ�-���z{��Ɩ�-�\�E���Qc�!w�a��5zNr3��e&�*b�1e+�On�g��e���Y��n��]����b�2��<s�m��nB�p��4���EQ�%�зԯ�ec{ @��ó�,T��0�����N������/�:���h+��(N����00����,�Xi.D!�����g�KrV�MH�/���P=,{��rW� :�G"�W��*���h��;q��&&���A.�M��-�KY��*W. ��g��P���dh�휶:o��3�ȕ��z�{h��%"�vͯ�Qok`��Ȓ��mW^�Χ3y���>���>-�����&���W�!�@"�#:u&��G5�゠ϸ�/�ܴ��
��A�I=o	��� {��2A���:]�㭫Yߤ��xLy�h���I	�52&+���vD�����C��P����s��萳}��O������5XN�\�L�G;�&N�ǟ7�=��̡	      �       x�3�t:�0�3Ə��ˈӷ4���� p��      �   5  x���=r�0���)�x��K�W)����`��p�i|�Lr���/�M"	�,������l��;w'�)���\�P���a��O���a�x��EV?
(!�n�mq��O�|����.��)e�0?})���Ha~>���`m����H�?�vd�9F/����ҥ�w������W��^E�G�Ph4��tE�#���K��>O���=T1�ʯ���Bt��#S ���%l�s��Gd�TF:.$�0B�V���(��Ւ�&��*��
{Eg"�>XA:��79c�5�eI�,��0���W3B�"��%      �      x�}�AR�0E��)|w$�N��]�d���Lbڙ�`�3���`�^�7A��-�0[���4���U<	5�0&n��oj	+	�KPO�Ї���>H[	S�c����i�#v�5��������	��4ˏ�]�]=��#L���V�ռ+�v4}� �S,k1"R�,�
��F���x���7�<L*�m� �j�R.gl�r���m�ٳ����k��f��x������%�%��߮d��Sq���s�����%I�	00�|      �   2   x�3�����5�,���2s��.3NG��9�g�ah������� P�      �   C  x�u�?N�0�g��@h�7�Ā�1u��4��:������Ѕ#P110�T)���o�ݴRڊ�������� �����*�+4��'!�}����v/�yA#�JգW$8��T��]���! m�|�v|�,����P�*�[�|���o�pA��q��v`����z�*UA�ż�T���1�%v"��Z��.�ղѫ@�>*�Qx
�7���q��A]H�|�Iˣo���^��{^VV�Fq��1�#tkZ|�9�R�5]�$F����݇��m
�V�>/Vg\A#�����(���L1u@�bh���w�Nϫ��]a�� ՚׼      �   )   x�3�4�4����2�4�41�CC��1�b���� �      �   F   x�3426153���4M�60�,�4�2���s����$̀Fp	NK���D�qZXAM�b���� C	      �      x������ � �      �   H   x�3��IM�4 ��?NCCN#.s�Dd!#N3.CΔ�Լ�T�`����	P�!����x� �e      �   V   x�3�LLJ�4 �4Β��NCNs.S,\6�2�LL���3�I��qprBđ�-� ���9�3
�C��A���qqq �G�      �   J   x�v�<2���D߇�wr�p��W��gX����%
~��
G&<�=9/(�)s�b��=... �T�      �   2   x�3�t�x�{�B6��]�Y���e�yd���
@��#���=... &��      �      x�3�v��s�,�2�t��c���� ^H�     